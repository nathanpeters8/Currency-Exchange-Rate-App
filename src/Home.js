import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chart from 'chart.js/auto';

import { json, checkStatus } from './utils';
import Converter from './Converter';
import ExchangeRate from './ExchangeRate';
import './Home.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
};

// Home component houses all the main content like the page buttons, 'from' and 'to' currency dropdowns, and is a parent to the the Converter and ExchangeRate components
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
      currencyChange: 'none',
      page: 'converter'
    };

    this.chartRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.getConversion = this.getConversion.bind(this);
    this.getConversionList = this.getConversionList.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.showHistory = this.showHistory.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getHistoricalRates = this.getHistoricalRates.bind(this);
    this.buildChart = this.buildChart.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  // gets the list of currencies when component mounts
  componentDidMount() {
    this.getCurrencies();
  }

  // fetchs list of currencies from API
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

  // fetchs conversion rate between 'from' and 'to' currencies at given amount
  getConversion() {
    let { from, to, amount } = this.state;
    let newAmount = parseFloat(amount).toFixed(2);

    // early return if 'from' or 'to' values are not a valid currency
    if (from === 'DEFAULT' || to === 'DEFAULT') {
      return null;
    }

    // alert user if currencies are the same
    if(from === to) {
      alert('Please choose two different currencies.');
      return null;
    }
    // alert user if amount is 0
    else if(amount == 0) {
      alert('Amount must be greater or less than 0');
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

  // fetchs conversion rates from given currency to all currencies at given amount
  getConversionList() {
    let { from, to, amount } = this.state;
    let newAmount = parseFloat(amount).toFixed(2);

    if (from === 'DEFAULT' || from === to || amount == 0) {
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

  // handles changes to the 'from' and 'to' currency dropdown values
  handleChange(event) {
    // if 'from' dropdown value changes
    if (event.target.id === 'fromDropdown') {
      // update 'from' currency state value and change state values for animations
      this.setState({ from: event.target.value, valueChange: true, currencyChange: 'from' }, () => {
        // debounce to prevent too many api fetches
        setTimeout(() => {
          // get new conversions and set change values back to original state
          this.getConversion();
          this.getConversionList();
          this.getHistoricalRates();
          this.setState({ valueChange: false, currencyChange: 'none' });
        }, 500);
      });
    }
    // if 'to' dropdown value changes
    else if (event.target.id === 'toDropdown') {
      // update 'to' currency state value and change state values for animations
      this.setState({ to: event.target.value, valueChange: true, currencyChange: 'to' }, () => {
        // debounce to prevent too many api fetches
        setTimeout(() => {
          // get new conversions and set change values back to original state
          this.getConversion();
          this.getHistoricalRates();
          this.setState({ valueChange: false, currencyChange: 'none' });
        }, 500);
      });
    }
  }

  // updates amount state to new input amount value and get new conversions
  changeAmount(newAmount) {
    this.setState({ amount: newAmount, valueChange: true }, () => {
      this.getConversion();
      this.getConversionList();
      setTimeout(() => {
        this.setState({ valueChange: false });
      }, 500);
    });
  }

  // handles switching currencies when switch button is clicked and gets new conversion rates
  handleSwitch(event) {
    let { from, to } = this.state;
    if (from === 'DEFAULT' || to === 'DEFAULT') {
      return null;
    }
    this.setState({ from: to, to: from, valueChange: true, currencyChange: 'both' }, () => {
      setTimeout(() => {
        this.getConversion();
        this.getConversionList();
        this.getHistoricalRates();
        this.setState({ valueChange: false, currencyChange: 'none' });
      }, 500);
    });
  }

  // handles switch to chart page when a "View History" button within the table is clicked
  showHistory(event, conv) {
    console.log(conv);
    this.setState({ to: conv }, () => {
      this.getHistoricalRates();
    });
  }

  // updates page state value whenever the page is changed
  handlePageChange(event, pageName='') {
    if(event === null && pageName!== '') {
      this.setState({page: pageName});
    }
    else {
      if (event.target.id === 'converter-page') {
        this.setState({ page: 'converter' });
      } else if (event.target.id === 'chart-page' || event.target.classList.contains('history-button')) {
        this.setState({ page: 'chart' });
      }
    }
  }

  // fetches historical rates from api
  getHistoricalRates() {
    const { from, to } = this.state;
    if (from === 'DEFAULT' || to === 'DEFAULT' || this.chartRef.current === 'null') {
      return null;
    }
    
    // get end and start dates
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // fetch historical rates from api
    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${from}&to=${to}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data);
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map((rate) => rate[to]);
        const chartLabel = `1 ${from} => ${to}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch((error) => console.error(error.message));
  }

  // resizes chart whenever the screen resizes 
  handleResize(chart) {
    chart.resize();
  }

  // builds a chart with the given historical data
  buildChart(labels, data, label) {
    const chartRef = this.chartRef.current.getContext('2d');

    if (typeof this.chart !== 'undefined') {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartRef.current.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
            borderColor: '#d9b310',
            backgroundColor: '#d9b310',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        onResize: this.handleResize,
        resizeDelay: 750,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#ffffff',
            },
            grid: {
              color: '#0b3c5d',
            },
          },
          y: {
            ticks: {
              color: '#ffffff',
            },
            grid: {
              color: '#0b3c5d',
            },
          },
        },
      },
    });
  }

  render() {
    const {
      currencies,
      from,
      to,
      conversion,
      amount,
      error,
      conversionList,
      switchButton,
      page,
      valueChange,
      currencyChange,
    } = this.state;
    
    return (
      <div className='container-md py-5 px-3 mx-auto'>
        <div className='row justify-content-center'>
          {/* Page Buttons */}
          <div className='col-10 col-sm-6 d-flex justify-content-between' id='pageButtons'>
            {/* Currency Converter page link */}
            <Link
              to='/'
              className={'btn text-white overflow-hidden col-4 ' + (page === 'converter' ? 'page-active' : '')}
              id='converter-page'
              onClick={this.handlePageChange}
            >
              Currency Converter
            </Link>
            {/* Historical Rates Chart page link */}
            <Link
              to='/chart'
              className={'btn text-white overflow-hidden col-4 ' + (page === 'chart' ? 'page-active' : '')}
              id='chart-page'
              onClick={this.handlePageChange}
            >
              Historical Rates
            </Link>
          </div>
        </div>
        <div className='row mt-5'>
          {/* Page Title */}
          <h2 className='text-center text-decoration-underline fw-bold' id='pageTitle'>
            {page === 'converter' ? 'Currency Converter' : 'Historical Rates Chart'}
          </h2>
        </div>
        {/* Currency Dropdowns Div */}
        <div className='row d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center mt-4 px-md-5 text-white'>
          {/* From Dropdown*/}
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
                {/* Default option */}
                <option value='DEFAULT' disabled>
                  Choose Currency...
                </option>
                {(() => {
                  // make new option element for every currency
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
          <div className={'col-1 d-flex justify-content-center align-self-center'}>
            <button
              className='btn border-0'
              id='switchButton'
              disabled={from !== 'DEFAULT' && to !== 'DEFAULT' ? '' : 'disabled'}
              onClick={this.handleSwitch}
            >
              <FontAwesomeIcon icon='fa-solid fa-repeat' style={{ color: '#ffffff' }} />
            </button>
          </div>
          {/* To Dropdown */}
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
                {/* Default option */}
                <option value='DEFAULT' disabled>
                  Choose Currency...
                </option>
                {(() => {
                  // make new option element for every currency
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
        {/* handles switches between converter and chart pages */}
        <Switch>
          <Route path='/' exact>
            <Converter
              from={from}
              to={to}
              currencies={currencies}
              conversion={conversion}
              conversionList={conversionList}
              amount={amount}
              error={error}
              valueChange={valueChange}
              currencyChange={currencyChange}
              getConversion={this.getConversion}
              getConversionList={this.getConversionList}
              changeAmount={this.changeAmount}
              showHistory={this.showHistory}
              handlePageChange={this.handlePageChange}
            />
          </Route>
          <Route path='/chart'>
            <ExchangeRate
              from={from}
              to={to}
              chartRef={this.chartRef}
              getHistoricalRates={this.getHistoricalRates}
              currencyChange={currencyChange}
              handlePageChange={this.handlePageChange}
            />
          </Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    );
  }
}

export default Home;
