import React from 'react';
import Conversion from './Conversion';
import { json, checkStatus } from './utils';

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1.00,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleAmount(event) {
    setTimeout(() => {
      if (isNaN(event.target.value) || event.target.value === '') {
        this.setState({ amount: parseFloat(1).toFixed(2) }, () => {
          this.props.getConversion(1);
        });
      }
      else {
        this.setState({amount: parseFloat(event.target.value).toFixed(2)}, () => {
          this.props.getConversion(this.state.amount);
        });
      }
    }, 750);
  }

  render() {
    const { amount } = this.state;
    const { from, to, currencies, conversion, error } = this.props;
    return (
      <>
        <div className='row justify-content-center mt-5'>
          <h2 className='text-center text-decoration-underline mb-5'>Currency Converter</h2>
          <div className='col-6 d-flex flex-column align-items-center mb-4 px-0'>
            <label className='form-label'>Amount</label>
            <form onSubmit={this.handleSubmit} className='form-inline'>
              <div className='input-group' id='amount-input'>
                <span className='input-group-text'>$</span>
                <input type='text' className='form-control' id='amount' placeholder='1.00' onChange={this.handleAmount} disabled={(from && to ? '' : 'disabled')}/>
              </div>
            </form>
          </div>
        </div>
        <div className={'row justify-content-center flex-column align-items-center mt-5 ' + (conversion === -1 ? 'd-none' : 'd-flex')}>
          {(() => {
            if (error) {
              if(amount <= 0) {
                return <h3 className='text-center text-danger text-uppercase'>Amount must be greater or less than 0</h3>;
              }
            }
            return (
              <Conversion
                to={to}
                from={from}
                amount={amount}
                currencies={currencies}
                conversion={conversion}
              />
            );
          })()}
          <div className="col-6 text-center">
            <button className='btn btn-warning'>More Exchange Rates for {from}</button>
          </div>
        </div>
      </>
    );
  }
}

export default Converter;
