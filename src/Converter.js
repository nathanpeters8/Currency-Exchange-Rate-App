import React from 'react';
import Conversion from './Conversion';
import { json, checkStatus } from './utils';

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      conversion: -1,
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    let amount = this.handleAmount(document.getElementById('amount').value);
    if(amount !== -999) {
      this.getConversion(amount);
      this.setState({ amount: amount });
    }
    else {
      alert("Invalid Amount");
    }
  }

  handleAmount(amount) {
    if (isNaN(amount)) {
      return -999;
    }
    return parseFloat(amount).toFixed(2);
  }

  getConversion(amount) {
    let { from, to } = this.props;
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data);
        this.setState({conversion: data.rates[to], error: ''});
      })
      .catch((error) => {
        console.log(error);
        this.setState({error: error.message});
      })
  }

  render() {
    const { amount, conversion, error } = this.state;
    return (
      <>
        <div className='row justify-content-center mt-5'>
          <h2 className='text-center text-decoration-underline mb-5'>Currency Converter</h2>
          <div className='col-6 d-flex flex-column align-items-center mb-4 px-0'>
            <label className='form-label'>Amount</label>
            <form onSubmit={this.handleSubmit} className='form-inline'>
              <div className='input-group' id='amount-input'>
                <span className='input-group-text'>$</span>
                <input type='text' className='form-control' id='amount' />
                <button type='submit' className='btn btn-success'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={'row justify-content-center mt-5 ' + (conversion === -1 ? 'd-none' : 'd-flex')}>
          {(() => {
            if (error) {
              return error;
            }
            return (
              <Conversion
                to={this.props.to}
                from={this.props.from}
                amount={amount}
                currencies={this.props.currencies}
                conversion={conversion}
              />
            );
          })()}
        </div>
      </>
    );
  }
}

export default Converter;
