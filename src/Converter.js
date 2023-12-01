import React from 'react';
import Conversion from './Conversion';
import { json, checkStatus } from './utils';

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleAmount(event) {
    setTimeout(() => {
      if(event.target.value == this.props.amount) {
        console.log('value are the same');
        return null;
      }
      if(isNaN(event.target.value) || event.target.value === '') {
        console.log('change ' + this.props.amount + ' to 1');
        this.props.changeAmount(1);
      }
      else {
        console.log('change ' + this.props.amount + ' to ' + event.target.value);
        this.props.changeAmount(event.target.value);
      }
    }, 1000);
  }

  render() {
    const { from, to, amount, currencies, conversion, error, conversionList } = this.props;
    return (
      <>
        <div className='row justify-content-center mt-5'>
          <h2 className='text-center text-decoration-underline mb-5'>Currency Converter</h2>
          <div className='col-6 d-flex flex-column align-items-center mb-4 px-0'>
            <label className='form-label'>Amount</label>
            <form onSubmit={this.handleSubmit} className='form-inline'>
              <div className='input-group' id='amount-input'>
                <span className='input-group-text'>$</span>
                <input
                  type='text'
                  className='form-control'
                  id='amount'
                  placeholder='1.00'
                  onChange={this.handleAmount}
                  disabled={from && to ? '' : 'disabled'}
                />
              </div>
            </form>
          </div>
        </div>
        {(() => {
          if (error) {
            if (amount <= 0) {
              return (
                <h3 className='text-center text-danger text-uppercase'>Amount must be greater or less than 0</h3>
              );
            }
          }
          return (
            <Conversion
              to={to}
              from={from}
              amount={amount}
              currencies={currencies}
              conversion={conversion}
              getConversion={this.props.getConversion}
              getConversionList={this.props.getConversionList}
              conversionList={conversionList}
              showHistory={this.props.showHistory}
            />
          );
        })()}
      </>
    );
  }
}

export default Converter;
