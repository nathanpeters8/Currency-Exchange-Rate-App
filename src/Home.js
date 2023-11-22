import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <>
        {/* Page Buttons */}
        <div className="container-md">
          <div className='row justify-content-center'>
            <div className='col-8 d-flex'>
              <Link to='/' className='btn btn-secondary flex-fill me-5'>
                Currency Converter
              </Link>
              <Link to='/chart' className='btn btn-secondary flex-fill ms-5'>
                Exchange Chart
              </Link>
            </div>
          </div>
        </div>
        {/* Currency Dropdowns */}
        <div className='container-md d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-md-around mt-4 px-md-5'>
          {/* From */}
          <div className='col-6 col-md-3 d-flex flex-md-column align-items-center justify-content-center mb-4'>
            <label className='form-label me-2'>From</label>
            <div className='dropdown-center col-12 d-flex'>
              <button
                type='button'
                className='btn btn-primary dropdown-toggle flex-fill'
                data-bs-toggle='dropdown'
                id='fromDropdown'
                aria-expanded='false'
              >
                USD
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <a href='#' className='dropdown-item'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#' className='dropdown-item'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#' className='dropdown-item'>
                    Link 3
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Switch Button */}
          <button className='btn btn-warning align-self-center ms-4 ms-md-0'>Switch</button>
          {/* To */}
          <div className='col-6 col-md-3 d-flex flex-md-column align-items-center justify-content-center mt-4 mt-md-0'>
            <label className='form-label pe-4 me-1'>To</label>
            <div className='dropdown-center col-12 d-flex'>
              <button
                type='button'
                className='btn btn-primary dropdown-toggle flex-fill'
                data-bs-toggle='dropdown'
                id='fromDropdown'
                aria-expanded='false'
              >
                EURO
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <a href='#' className='dropdown-item'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#' className='dropdown-item'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#' className='dropdown-item'>
                    Link 3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
