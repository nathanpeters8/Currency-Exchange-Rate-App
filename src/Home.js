import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { json, checkStatus } from './utils';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {},
      fromCurrency: '',
      toCurrency: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies() {
    fetch(`https://api.frankfurter.app/currencies`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      console.log(data);
      this.setState({currencies: data});
    })
  }

  handleChange(event) {
    console.log(event.target.id + ': ' + event.target.value);
  }

  render() {
    const { currencies } = this.state;
    return (
      <>
        {/* Page Buttons */}
        <div className='row justify-content-center'>
          <div className='col-8 d-flex'>
            <Link to='/' className='btn btn-secondary flex-fill me-5'>
              Currency Converter
            </Link>
            <Link to='/chart' className='btn btn-secondary flex-fill ms-5'>
              Exchange Chart
            </Link>
          </div>
        </div>
        {/* Currency Dropdowns */}
        <div className='row d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-md-around mt-4 px-md-5'>
          {/* From */}
          <div className='col-6 col-md-3 d-flex flex-column align-items-center justify-content-center mb-4'>
            <label className='form-label'>From</label>
            <div className='col-12 d-flex'>
              <select
                className='btn btn-primary flex-fill'
                id='fromDropdown'
                onChange={this.handleChange}
                defaultValue={'DEFAULT'}
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
          <div className='col-6 col-md-3 d-flex flex-column align-items-center justify-content-center mt-4 mt-md-0'>
            <label className='form-label'>To</label>
            <div className='col-12 d-flex'>
              <select
                className='btn btn-primary flex-fill'
                id='toDropdown'
                onChange={this.handleChange}
                defaultValue={'DEFAULT'}
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
      </>
    );
  }
}

export default Home;
