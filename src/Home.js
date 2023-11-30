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
      from: 'DEFAULT',
      to: 'DEFAULT',
      conversion: 0,
      conversionList: {},
      amount: 1.0,
      error: '',
      switchButton: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.getConversion = this.getConversion.bind(this);
    this.getConversionList = this.getConversionList.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
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
        this.setState({ error: error.message });
      });
  }

  getConversion() {
    let { from, to, amount } = this.state;
    let newAmount = parseFloat(amount).toFixed(2);
    if (from === 'DEFAULT' || to === 'DEFAULT') {
      return null;
    }
    fetch(`https://api.frankfurter.app/latest?amount=${newAmount}&from=${from}&to=${to}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log('Single Conversion: ' + from + ' => ' + to);
        console.log(data);
        this.setState({ conversion: data.rates[to], error: '' });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: error.message });
      });
  }

  getConversionList() {
    let { from, amount } = this.state;
    let newAmount = parseFloat(amount).toFixed(2);
    if (from === 'DEFAULT') {
      return null;
    }
    fetch(`https://api.frankfurter.app/latest?from=${from}&amount=${newAmount}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log('Conversion List: ' + from);
        console.log(data);
        this.setState({ conversionList: data.rates });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: error.message });
      });
  }

  handleChange(event) {
    if (event.target.id === 'fromDropdown') {
      this.setState({ from: event.target.value }, () => {
        setTimeout(() => {
          this.getConversion();
          this.getConversionList();
        }, 500);
      });
    } else if (event.target.id === 'toDropdown') {
      this.setState({ to: event.target.value }, () => {
        setTimeout(() => {
          this.getConversion();
        }, 500);
      });
    }
  }
  
  changeAmount(newAmount) {
    // console.log(newAmount);
    this.setState({ amount: newAmount }, () => {
      setTimeout(() => {
        this.getConversion();
        this.getConversionList();
      }, 750);
    });
  }

  handleSwitch(event) {
    let { from, to } = this.state;
    if(from === 'DEFAULT' || to === 'DEFAULT') {
      return null; 
    }
    this.setState({from: to, to: from}, () => {
      setTimeout(() => {
        this.getConversion();
        this.getConversionList();
      }, 500);
    });
  }

  render() {
    const { currencies, from, to, conversion, amount, error, conversionList, switchButton } = this.state;
    return (
      <div className='container-md'>
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
                value={from}
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
            <i id='switchButton' className='btn btn-warning' onClick={this.handleSwitch}>\/</i>
          </div>
          {/* To */}
          <div className='col-5 col-md-3 d-flex flex-column align-items-center justify-content-center mt-4 mt-md-0'>
            <label className='form-label'>To</label>
            <div className='col-12 d-flex justify-content-center'>
              <select
                className='btn btn-primary flex-fill'
                id='toDropdown'
                onChange={this.handleChange}
                value={to}
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
              getConversionList={this.getConversionList}
              conversionList={conversionList}
              changeAmount={this.changeAmount}
            />
          </Route>
          <Route path='/chart'>
            <ExchangeRate from={from} to={to} />
          </Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    );
  }
}

export default Home;
