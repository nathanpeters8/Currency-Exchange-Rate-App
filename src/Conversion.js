import React from 'react';


class Conversion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false
    }
  }

  render() { 
    const { from, to, amount, currencies, conversion, conversionList } = this.props;
    const { showList } = this.state;

    if(from === '' || to === '') {
      return null;
    }
    return (
      <>
        <div className='col-6 d-flex flex-column align-items-center my-3 px-0'>
          <h2 className='text-center fw-bold'>
            {from}
            {' => '}
            {to}
          </h2>
          <h5>
            {amount} {currencies[to]} =
          </h5>
          <h3>
            {conversion} {from}s
          </h3>
          {/* <h6>1 {from} = 1.09999999 {to}</h6> */}
          <button
            className='btn btn-warning'
            onClick={() => {
              this.props.getConversionList();
              this.setState({showList: !showList});
            }}
          >
            More Exchange Rates for {from}
          </button>
        </div>
        <div className={'col-6 table-responsive ' + (showList === true ? 'd-flex' : 'd-none')}>
          <table className='table table-bordered table-striped d-flex justify-content-center'>
            <tbody className='overflow-scroll' style={{ height: 200 + 'px' }}>
              {(() => {
                return Object.keys(conversionList).map((conv, i) => {
                  return (
                    <tr>
                      <td>{conv}</td>
                      <td>{conversionList[conv]}</td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
          {/* {(() => {
            return Object.keys(conversionList).map((conversion, i) => {
              return (
                <p>{conversionList[conversion]}</p>
              );
            });
          })()} */}
        </div>
      </>
    );
  }
}
 
export default Conversion;