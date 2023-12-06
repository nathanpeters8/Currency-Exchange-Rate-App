import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { json, checkStatus } from './utils';
import Converter from './Converter';
import ExchangeRate from './ExchangeRate';
import './Home.css';

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
      switchButton: false,
      valueChange: false,
      currencyChange: 'none'
    };

    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.getConversion = this.getConversion.bind(this);
    this.getConversionList = this.getConversionList.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.showHistory = this.showHistory.bind(this);
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
      this.setState({ from: event.target.value, valueChange: true, currencyChange: 'from' }, () => {
        setTimeout(() => {
          this.getConversion();
          this.getConversionList();
          this.setState({valueChange: false, currencyChange: 'none'});
        }, 500);
      });
    } else if (event.target.id === 'toDropdown') {
      this.setState({ to: event.target.value, valueChange: true, currencyChange: 'to'}, () => {
        setTimeout(() => {
          this.getConversion();
          this.setState({valueChange: false, currencyChange: 'none'});
        }, 500);
      });
    }
  }
  
  changeAmount(newAmount) {
    this.setState({ amount: newAmount, valueChange: true }, () => {
      this.getConversion();
      this.getConversionList();
      setTimeout(() => {
        this.setState({valueChange: false});
      }, 500);
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

  showHistory(event, conv) {
    console.log(conv);
    this.setState({to: conv});
  }

  render() {
    const { currencies, from, to, conversion, amount, error, conversionList, switchButton } = this.state;
    return (
      <div className='container-md py-5 px-3 mx-auto'>
        {/* Page Buttons */}
        <div className='row justify-content-center'>
          <div className='col-10 col-sm-6 d-flex justify-content-between' id='pageButtons'>
            <Link to='/' className='btn text-white col-4'>
              Currency Converter
            </Link>
            <Link to='/chart' className='btn text-white col-4'>
              Historical Rates
            </Link>
          </div>
        </div>
        {/* Currency Dropdowns */}
        <div className='row d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center mt-4 px-md-5 text-white'>
          {/* From */}
          <div className='col-6 col-md-4 d-flex flex-column align-items-center justify-content-center mb-3'>
            <label className='form-label'>From</label>
            <div className='d-flex justify-content-center'>
              <select
                className='form-select bg-secondary text-white'
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
            <i id='switchButton' className='btn' onClick={this.handleSwitch}>
              <FontAwesomeIcon icon='fa-solid fa-repeat' style={{color: '#ffffff',}} />
            </i>
          </div>
          {/* To */}
          <div className='col-6 col-md-4 d-flex flex-column align-items-center justify-content-center mt-2 mt-md-0'>
            <label className='form-label'>To</label>
            <div className='d-flex justify-content-center'>
              <select
                className='form-select bg-secondary text-white'
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
              showHistory={this.showHistory}
              valueChange={this.state.valueChange}
              currencyChange={this.state.currencyChange}
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
