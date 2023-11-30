import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Converter from './Converter';
import ExchangeRate from './ExchangeRate';
import Home from './Home';
import './App.css';

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
      
      <Home/>

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
