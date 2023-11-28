import React from 'react';


class Conversion extends React.Component {
  constructor(props) {
    super(props);

  }

  render() { 
    const { from, to, amount, currencies, conversion } = this.props;

    if(from === '' || to === '') {
      return null;
    }
    return (
      <div className='col-6 d-flex flex-column align-items-center my-3 px-0'>
        <h2 className='text-center fw-bold'>{from}{' => '}{to}</h2>
        <h5>{amount} {currencies[to]} =</h5>
        <h3>{conversion} {from}s</h3>
        {/* <h6>1 {from} = 1.09999999 {to}</h6> */}
      </div>
    );
  }
}
 
export default Conversion;