import React from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { json, checkStatus } from './utils';
import './ExchangeRate.css';

// ExchangeRate component houses the chart page content that will display the historical rates chart between two currencies
class ExchangeRate extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.props.getHistoricalRates();
  }

  render() {
    const { from, to, chartRef, currencyChange } = this.props;
    return (
      <>
        <div className='row d-flex flex-column justify-content-center align-items-center mt-5 text-white'>
          <div className='col-12 d-flex flex-column align-items-center mb-2 px-0'>
            {/* <h3 className={'fw-bold display-6 mb-4 ' + (from !== 'DEFAULT' && to !== 'DEFAULT' ? 'd-flex' : 'd-none')}>
              {from} {<FontAwesomeIcon icon={'fa-solid fa-arrow-right'} />} {to}
            </h3> */}
            <div
              className={
                'h2 fw-bold d-flex text-decoration-underline ' + (from !== 'DEFAULT' && to !== 'DEFAULT' ? 'd-flex' : 'd-none')
              }
            >
              {/* From Currency */}
              <span className={'p-2 ' + (currencyChange === 'from' || currencyChange === 'both' ? 'flash' : '')}>
                {from}
              </span>
              {/* Right Arrow */}
              <span className='p-2'>
                <FontAwesomeIcon icon='fa-solid fa-arrow-right' />
              </span>
              {/* To Currency */}
              <span className={'p-2 ' + (currencyChange === 'to' || currencyChange === 'both' ? 'flash' : '')}>
                {to}
              </span>
            </div>
          </div>
          <div className='col-12 col-md-10 col-xl-8 d-flex justify-content-center' id='chartDiv'>
            {/* Chart */}
            {(() => {
              if (chartRef.current === 'null') {
                return null;
              }
              return <canvas ref={chartRef}></canvas>;
            })()}
          </div>
        </div>
      </>
    );
  }
}

export default ExchangeRate;
