import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import { json, checkStatus } from './utils';
import Converter from './Converter';
import ExchangeRate from './ExchangeRate';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {},
      from: '',
      to: '',
      conversion: 0,
      conversionList: {},
      amount: 1.00,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.getConversion = this.getConversion.bind(this);
    // this.getConversionList = this.getConversionList.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies() {
    fetch(`https://api.frankfurter.app/currencies`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        this.setState({ currencies: data, error: '' });
      })
      .catch((error) => {
        console.log(error);
        this.setState({error: error.message})
      });
  }

  getConversion(amount) {
    let { from, to } = this.state;
    if (from === '' || to === '') {
      return null;
    }
    // let { amount } = this.state;
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data);
        this.setState({ conversion: data.rates[to], error: '' });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: error.message });
      });
  }

  // getConversionList() {
  //   let { from } = this.state;
  //   if (from === '') {
  //     return null;
  //   }
  //   fetch(`https://api.frankfurter.app/latest?from=${from}`)
  //     .then(checkStatus)
  //     .then(json)
  //     .then((data) => {
  //       // console.log(Object.keys(data.rates).map((conv, i) => {
  //       //   return data.rates[conv];
  //       // }));
  //       console.log(data.rates);
  //       this.setState({conversionList: data.rates});
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       this.setState({error: error.message});
  //     })
  // }

  handleChange(event) {
    setTimeout(() => {
      if (event.target.id === 'fromDropdown') {
        this.setState({ from: event.target.value }, () => {
          this.getConversion(this.state.amount);
        });
      } else if (event.target.id === 'toDropdown') {
        this.setState({ to: event.target.value }, () => {
          this.getConversion(this.state.amount);
        });
      }
    }, 750);
  }

  render() {
    const { currencies, from, to, conversion, amount, error } = this.state;
    return (
      <>
        {/* Page Buttons */}
        <div className='row justify-content-center'>
          <div className='col-10 col-sm-6 d-flex justify-content-between'>
            <Link to='/' className='btn btn-secondary col-4'>
              Currency Converter
            </Link>
            <Link to='/chart' className='btn btn-secondary col-4'>
              Exchange Chart
            </Link>
          </div>
        </div>
        {/* Currency Dropdowns */}
        <div className='row d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-md-around justify-content-xl-center mt-4 px-md-5'>
          {/* From */}
          <div className='col-5 col-md-3 d-flex flex-column align-items-center justify-content-center mb-4'>
            <label className='form-label'>From</label>
            <div className='col-12 d-flex justify-content-center'>
              <select
                className='btn btn-primary flex-fill'
                id='fromDropdown'
                onChange={this.handleChange}
                defaultValue={'DEFAULT'}
                required
              >
                <option value='DEFAULT' disabled>
                  Choose Currency...
                </option>
                {(() => {
                  return Object.keys(currencies).map((curr, i) => {
                    return (
                      <option key={i} value={curr}>
                        {curr} - {currencies[curr]}
                      </option>
                    );
                  });
                })()}
              </select>
            </div>
          </div>
          {/* Switch Button */}
          <div className='col-1 d-flex justify-content-center align-self-center'>
            <i className='btn btn-warning'>\/</i>
          </div>
          {/* To */}
          <div className='col-5 col-md-3 d-flex flex-column align-items-center justify-content-center mt-4 mt-md-0'>
            <label className='form-label'>To</label>
            <div className='col-12 d-flex justify-content-center'>
              <select
                className='btn btn-primary flex-fill'
                id='toDropdown'
                onChange={this.handleChange}
                defaultValue={'DEFAULT'}
                required
              >
                <option value='DEFAULT' disabled>
                  Choose Currency...
                </option>
                {(() => {
                  return Object.keys(currencies).map((curr, i) => {
                    return (
                      <option key={i} value={curr}>
                        {curr} - {currencies[curr]}
                      </option>
                    );
                  });
                })()}
              </select>
            </div>
          </div>
        </div>
        <Switch>
          <Route path='/' exact>
            <Converter
              from={from}
              to={to}
              currencies={currencies}
              conversion={conversion}
              amount={amount}
              error={error}
              getConversion={this.getConversion}
            />
          </Route>
          <Route path='/chart'>
            <ExchangeRate from={from} to={to} />
          </Route>
          <Route component={NotFound}></Route>
        </Switch>
      </>
    );
  }
}

export default Home;
