import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Converter from './Converter';
import Chart from './Chart';
import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
};

function App() {
  return (
    <Router basename='/Currency-Exchange-Rate-App'>
      <nav className='navbar bg-dark navbar-dark py-0 mb-2'>
        <div className='container-fluid flex-column align-items-start align-items-md-center'>
          <Link to='/' className='navbar-brand text-decoration-underline'>
            CurrExchange
          </Link>
          <span className='navbar-text'>Free Currency Converter and Exchange Rates</span>
        </div>
      </nav>
      <div className='container-md'>
        <div className='row justify-content-center'>
          <div className='col-8 d-flex'>
            <Link to='/' className='btn btn-secondary flex-fill me-5'>
              Currency Converter
            </Link>
            <Link to='/chart' className='btn btn-secondary flex-fill'>
              Exchange Chart
            </Link>
          </div>
        </div>
        <div className='container-md d-flex justify-content-center mt-4'>
          <div className= 'col-2 d-flex flex-column align-items-center'>
            <label className='form-label'>From</label>
            <div className="dropdown">
              <button type='button' className='btn btn-primary dropdown-toggle' data-bs-toggle='dropdown' id='fromDropdown' aria-expanded='false'>
                USD
              </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="dropdown-item">Link 1</a></li>
                <li><a href="#" className="dropdown-item">Link 2</a></li>
                <li><a href="#" className="dropdown-item">Link 3</a></li>
              </ul>
            </div>
          </div>
          <div className= 'col-2 d-flex flex-column align-items-center'>
            <label className='form-label'>To</label>
            <div className="dropdown">
              <button type='button' className='btn btn-primary dropdown-toggle' data-bs-toggle='dropdown' id='fromDropdown' aria-expanded='false'>
                EURO
              </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="dropdown-item">Link 1</a></li>
                <li><a href="#" className="dropdown-item">Link 2</a></li>
                <li><a href="#" className="dropdown-item">Link 3</a></li>
              </ul>
            </div>
          </div>
        </div>
        <Switch>
          <Route path='/' exact component={Converter}></Route>
          <Route path='/chart' component={Chart}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
      <footer className='border d-flex justify-content-around mt-2'>
        <p>Created by Nathan Peters</p>
        <div className='h5'>
          <i>Portfolio|</i>
          <i>LinkedIn|</i>
          <i>GitHub|</i>
        </div>
      </footer>
    </Router>
  );
}

export default App;
