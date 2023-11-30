import React from 'react';

class Conversion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
    };
  }

  render() {
    const { from, to, amount, currencies, conversion, conversionList } = this.props;
    const { showList } = this.state;

    if (from === '' || to === '') {
      return null;
    }
    return (
      <>
        <div
          className={
            'row justify-content-between ' + (showList===false?'flex-column':'flex-column flex-md-row') + ' align-items-center mt-5 ' + (conversion === -1 ? 'd-none' : 'd-flex')
          }
        >
          <div className={'col-6 col-md-5 p-1 d-flex flex-column align-items-center' + (showList===false?'align-items-center':'align-items-center align-items-md-end') + ' my-3 px-0'}>
            <h2 className='text-center fw-bold'>
              {from}
              {' => '}
              {to}
            </h2>
            <h5 className='text-center'>
              {amount} {currencies[from]} =
            </h5>
            <h3 className='text-center'>
              {conversion} {currencies[to]}s
            </h3>
            {/* <h6>1 {from} = 1.09999999 {to}</h6> */}
          </div>
          <div className={'col-6 d-flex p-1 justify-content-center ' + (showList===true?'col-md-1 align-self-md-stretch':'col-md-2')}>
            <button
              className='btn btn-warning'
              onClick={() => {
                // this.props.getConversionList(amount);
                this.setState({ showList: !showList });
              }}
            >
              More Exchange Rates for {from}
            </button>
          </div>
          <div
            id='conversionTable'
            className={'col-10 col-md-5 mt-3 mt-md-0 p-1 pt-0 justify-content-center overflow-auto ' + (showList === true ? 'd-flex' : 'd-none')}
            style={{'height': 300 + 'px'}}
          >
            <table className='table table-bordered table-striped'>
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
                      <tr key={conv} className=''>
                        <td className=''>{currencies[conv]}</td>
                        <td className=''>{conversionList[conv]}</td>
                        <td className=''>
                          <button>View Chart</button>
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
