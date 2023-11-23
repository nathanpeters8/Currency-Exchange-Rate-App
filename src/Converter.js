import React from 'react';

class Converter extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(document.getElementById('amount').value);
    console.log(this.props);
  }
  render() {
    return (
      <>
        <div className='row justify-content-center mt-5'>
          <div className='col-6 d-flex flex-column align-items-center mb-4 px-0'>
            <label className='form-label'>Amount</label>
            <form onSubmit={this.handleSubmit} className='form-inline'>
              <div className= 'input-group' id='amount-input'>
                <span className='input-group-text'>$</span>
                <input type='text' className='form-control' id='amount'/>
                <button type='submit' className='btn btn-success'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Converter;
