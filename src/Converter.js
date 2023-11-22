import React from 'react';

class Converter extends React.Component {
  render() {
    return (
      <>
        <div className='row justify-content-center mt-5'>
          <div className='col-6 col-md-3 d-flex flex-column align-items-center mb-4 px-0'>
            <label className='form-label'>Amount</label>
            <div className= 'input-group' id='amount-input'>
              <span className='input-group-text'>$</span>
              <input type='text' className='form-control ms-0' />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Converter;
