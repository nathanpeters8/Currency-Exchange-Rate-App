import React from 'react';

class ExchangeRate extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Display Chart');
    console.log(this.props);
  }

  render() {
    return(
      <>
        <div className='row justify-content-center mt-5'>
          <div className='col-6 col-md-3 d-flex flex-column align-items-center mb-4 px-0'>
            <button type='submit' className='btn btn-success' onClick={this.handleSubmit}>View Chart</button>
          </div>
        </div>
      </>
    );
  }
}

export default ExchangeRate;