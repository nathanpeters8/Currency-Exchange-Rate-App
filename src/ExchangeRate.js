import React from 'react';

class ExchangeRate extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { from, to } = this.props;
    return (
      <>
        <div className='row justify-content-center mt-5'>
          <h2 className='text-center text-decoration-underline mb-5'>Historical Rates Chart</h2>
          <div className='col-6 col-md-3 d-flex flex-column align-items-center mb-4 px-0'>
            <h3 className={'fw-bold display-6 mb-4 ' + (from !== 'DEFAULT' && to !== 'DEFAULT' ? 'd-flex' : 'd-none')}>
              {from} {' => '} {to}
            </h3>
            {/* <button type='submit' className='btn btn-success' onClick={this.handleSubmit}>
              View Chart
            </button> */}
            <h6>**Temporary Image for Chart**</h6>
            <img src='https://picsum.photos/600/500' alt='temporary pic' />
          </div>
        </div>
      </>
    );
  }
}

export default ExchangeRate;