import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Conversion.css';

// Conversion component houses the conversion text and the table showing additional exchange rates
class Conversion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      flexDir: 'column',
    };
    this.handleListTransition = this.handleListTransition.bind(this);
  }

  // handles and improves layout changes when showing or hiding the list of exchange rates
  handleListTransition() {
    let { flexDir } = this.state;
    if (flexDir === 'column') {
      this.setState({ flexDir: 'row' }, () => {
        this.setState({ showList: true });
      });
    } else {
      this.setState({ showList: false }, () => {
        setTimeout(() => {
          this.setState({ flexDir: 'column' });
        }, 1000);
      });
    }
  }

  render() {
    const { from, to, amount, currencies, conversion, conversionList, valueChange, currencyChange } = this.props;
    const { showList, flexDir } = this.state;

    return (
      <div
        className={
          'row justify-content-center justify-content-md-between mx-auto ' +
          (flexDir === 'column' ? 'flex-column' : 'flex-column flex-md-row') +
          ' align-items-center mt-2 ' +
          (from === 'DEFAULT' || to === 'DEFAULT' ? 'hide' : 'show')
        }
        id='conversion'
      >
        {/* Conversion Text */}
        <div
          className={
            'col-6 col-md-5 p-1 d-flex flex-column ' +
            (flexDir === 'column' ? 'align-items-center' : 'align-items-center align-items-md-end') +
            ' my-3 px-0 ' +
            (from === 'DEFAULT' || to === 'DEFAULT' ? 'hide' : 'show')
          }
          id='conversionText'
        >
          {/* Currency Text ("USD -> EUR") */}
          <div
            className={
              'h2 fw-bold d-flex text-decoration-underline ' + (flexDir === 'column' ? 'text-center' : 'text-center text-md-end')
            }
            id='currencyText'
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
            <span className={'p-2 ' + (currencyChange === 'to' || currencyChange === 'both' ? 'flash' : '')}>{to}</span>
          </div>
          {/* From Currency Amount ("1.00 Euro = ") */}
          <h5 className={flexDir === 'column' ? 'text-center' : 'text-center text-md-end'}>
            <span className={valueChange && currencyChange === 'none' ? 'flash' : ''}>
              {isNaN(amount) === true ? '1.00' : parseFloat(amount).toFixed(2)}{' '}
            </span>
            <span className={currencyChange === 'from' || currencyChange === 'both' ? 'flash' : ''}>
              {currencies[from]} =
            </span>
          </h5>
          {/* Conversion Rate ("0.92782 Euros") */}
          <h3 className={'fw-semibold ' + (flexDir === 'column' ? 'text-center' : 'text-center text-md-end')}>
            <span className={'h2 fw-semibold ' + (valueChange ? 'flash' : '')} id='conversion-span'>{conversion}</span>{' '}
            <span className={currencyChange === 'to' || currencyChange === 'both' ? 'flash' : ''}>
              {currencies[to]}s
            </span>
          </h3>
          {/* <h6>1 {from} = 1.09999999 {to}</h6> */}
        </div>
        {/* Table Button */}
        <div
          className={
            'col-6 d-flex p-1 justify-content-center ' +
            (flexDir === 'row' ? 'col-md-1 align-self-md-stretch' : 'col-md-2') +
            ' ' +
            (from === 'DEFAULT' || to === 'DEFAULT' ? 'hide' : 'show')
          }
          id='buttonDiv'
        >
          <button className='btn' onClick={this.handleListTransition}>
            {(() => {
              return flexDir === 'row' ? 'Show Less Exchange Rates' : 'More Exchange Rates for ' + from;
            })()}
          </button>
        </div>
        {/* Converion Table Div */}
        <div
          id='conversionTable'
          className={
            'col-10 col-md-5 mt-3 ms-2 ms-md-0 mt-md-0 p-0 pe-1 justify-content-center align-items-baseline text-center overflow-auto d-flex ' +
            (showList === true ? 'show' : 'hide')
          }
          style={{ height: 300 + 'px' }}
        >
          {/* Conversions Table */}
          <table className='table table-bordered table-striped-columns table-hover table-responsive'>
            <thead className='sticky-top'>
              <tr>
                <th>Currency</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* make a row for every conversion in the conversionList array */}
              {(() => {
                return Object.keys(conversionList).map((conv, i) => {
                  return (
                    <tr key={conv}>
                      <td>{currencies[conv]}</td>
                      <td>
                        <span className='fst-italic fw-light' style={{ fontSize: 11 + 'px' }}>
                          {parseFloat(amount).toFixed(2)} {from} =
                        </span>
                        <br />
                        <span className={'fw-bold ' + (valueChange ? 'flash' : '')}>{conversionList[conv]}</span>
                      </td>
                      <td>
                        <Link
                          to='/chart'
                          className='btn btn-sm fw-bold history-button'
                          onClick={(e) => {
                            this.props.showHistory(e, conv);
                            this.props.handlePageChange(e);
                          }}
                        >
                          View History
                        </Link>
                      </td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Conversion;
