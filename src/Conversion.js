import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import './Conversion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Conversion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      flexDir: 'column',
    };
    this.handleListTransition = this.handleListTransition.bind(this);
    // this.handleValueChange = this.handleValueChange.bind(this);
  }

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
    console.log(this.state.flexDir);
  }

  // handleValueChange() {
  //   this.setState({valueChange: true}, () => {
  //     console.log('has changed');
  //   })
  // }

  render() {
    const { from, to, amount, currencies, conversion, conversionList, valueChange, currencyChange } = this.props;
    const { showList, flexDir } = this.state;

    return (
      <>
        <div
          className={
            'row justify-content-center justify-content-md-between mx-auto ' +
            (flexDir === 'column' ? 'flex-column' : 'flex-column flex-md-row') +
            ' align-items-center mt-2 ' +
            (from === 'DEFAULT' || to === 'DEFAULT' ? 'hide' : 'show')
          }
          id='conversion'
        >
          <div
            className={
              'col-6 col-md-5 p-1 d-flex flex-column ' +
              (flexDir === 'column' ? 'align-items-center' : 'align-items-center align-items-md-end') +
              ' my-3 px-0 ' +
              (from === 'DEFAULT' || to === 'DEFAULT' ? 'hide' : 'show')
            }
            id='conversionText'
          >
            <div className='h2 text-center fw-bold d-flex text-decoration-underline' id='currencyText'>
              <span className={'p-2 ' + (currencyChange === 'from' || currencyChange === 'both' ? 'flash' : '')}>
                {from}
              </span>
              <span className='p-2'>
                <FontAwesomeIcon icon='fa-solid fa-arrow-right' />
              </span>
              <span className={'p-2 ' + (currencyChange === 'to' || currencyChange === 'both' ? 'flash' : '')}>
                {to}
              </span>
            </div>
            <h5 className='text-center'>
              <span className={valueChange && currencyChange === 'none' ? 'flash' : ''}>
                {isNaN(amount) === true ? '1.00' : parseFloat(amount).toFixed(2)}{' '}
              </span>
              <span className={currencyChange === 'from' || currencyChange === 'both' ? 'flash' : ''}>
                {currencies[from]} =
              </span>
            </h5>
            <h3 className={'text-center fw-semibold'}>
              <span className={'h2 fw-semibold ' + (valueChange ? 'flash' : '')}>{conversion}</span>{' '}
              <span className={currencyChange === 'to' || currencyChange === 'both' ? 'flash' : ''}>
                {currencies[to]}s
              </span>
            </h3>
            {/* <h6>1 {from} = 1.09999999 {to}</h6> */}
          </div>
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
          <div
            id='conversionTable'
            className={
              'col-10 col-md-5 mt-3 ms-2 ms-md-0 mt-md-0 p-0 pe-1 justify-content-center align-items-baseline text-center overflow-auto d-flex ' +
              (showList === true ? 'show' : 'hide')
            }
            style={{ height: 300 + 'px' }}
          >
            <table className='table table-bordered table-striped-columns table-hover'>
              <thead className='sticky-top'>
                <tr>
                  <th>Currency</th>
                  <th className={currencyChange === 'from' ? 'flash' : ''}>
                    <span className='small fst-italic font-monospace'>
                      ({parseFloat(amount).toFixed(2)} {from} =)
                    </span>
                    <br></br>
                    Rate
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  return Object.keys(conversionList).map((conv, i) => {
                    return (
                      <tr key={conv}>
                        <td>{currencies[conv]}</td>
                        <td>
                          <span className={valueChange ? 'flash' : ''}>{conversionList[conv]}</span>
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
      </>
    );
  }
}

export default Conversion;
