import React from 'react';
import Conversion from './Conversion';
import { json, checkStatus } from './utils';
import './Converter.css';

// Converter component houses the amount input box and the Conversion component
class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  // checks if amount changes or is not a valid input
  handleAmount(event) {
    // debounce to give user time to stop typing
    setTimeout(() => {
      // do nothing if inputted value and amount state value are same
      if(event.target.value === this.props.amount) {
        console.log('value are the same');
        return null;
      }
      // change amount to 1 if input value is not a number or an empty string
      if(isNaN(event.target.value) || event.target.value === '') {
        console.log('change ' + this.props.amount + ' to 1');
        this.props.changeAmount(1);
      }
      // otherwise change the amount state to the new inputted value
      else {
        console.log('change ' + this.props.amount + ' to ' + event.target.value);
        this.props.changeAmount(event.target.value);
      }
    }, 500);
  }

  render() {
    const {
      from,
      to,
      amount,
      currencies,
      conversion,
      error,
      conversionList,
      getConversion,
      getConversionList,
      showHistory,
      valueChange,
      currencyChange,
      handlePageChange,
    } = this.props;
    return (
      <>
        <div className='row justify-content-center mt-5 mx-auto'>
          <div className='col-6 d-flex flex-column align-items-center mb-4 px-0'>
            <label className='form-label'>Amount</label>
            {/* Amount Input Form */}
            <form onSubmit={this.handleSubmit} className='form-inline'>
              <div className='input-group border-0' id='amount-input'>
                <span className='input-group-text text-white'>$</span>
                {/* Amount Input */}
                <input
                  type='text'
                  className='form-control text-white'
                  id='amount'
                  placeholder='1.00'
                  onChange={this.handleAmount}
                  disabled={from !== 'DEFAULT' && to !== 'DEFAULT' ? '' : 'disabled'}
                  maxLength={6}
                />
              </div>
            </form>
          </div>
        </div>
        {(() => {
          // if amount is 0 do not render Conversion component
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
              getConversion={getConversion}
              getConversionList={getConversionList}
              conversionList={conversionList}
              showHistory={showHistory}
              valueChange={valueChange}
              currencyChange={currencyChange}
              handlePageChange={handlePageChange}
            />
          );
        })()}
      </>
    );
  }
}

export default Converter;