import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import './Conversion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Conversion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      flexDir: 'column'
    };
    this.handleListTransition = this.handleListTransition.bind(this);
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

  render() {
    const { from, to, amount, currencies, conversion, conversionList } = this.props;
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
            <div className='h2 text-center fw-bold d-flex text-decoration-underline'>
              <span className='p-2'>{from}</span>
              <span className='p-2'>
                <FontAwesomeIcon icon='fa-solid fa-arrow-right' />
              </span>
              <span className='p-2'>{to}</span>
            </div>
            <h5 className='text-center'>
              {isNaN(amount) === true ? '1.00' : parseFloat(amount).toFixed(2)} {currencies[from]} =
            </h5>
            <h3 className='text-center'>
              {conversion} {currencies[to]}s
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
              More Exchange Rates for {from}
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
                  <th>Currency (from {from})</th>
                  <th>Rate</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  return Object.keys(conversionList).map((conv, i) => {
                    return (
                      <tr key={conv}>
                        <td>{currencies[conv]}</td>
                        <td>{conversionList[conv]}</td>
                        <td>
                          <Link
                            to='/chart'
                            className='btn btn-sm fw-bold'
                            onClick={(e) => {
                              this.props.showHistory(e, conv);
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
