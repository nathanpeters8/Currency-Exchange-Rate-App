import Home from './Home';
import Converter from './Converter';
import ExchangeRate from './ExchangeRate';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faRepeat, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';

library.add(faGithub, faRepeat, faLinkedin, faUserTie);

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

      <Home />

      <footer className='border mt-2'>
        <div className="row d-flex justify-content-between">
          <div className="col-6 d-flex">
            <p>Created by Nathan Peters</p>
          </div>
          <div className='h3 d-flex col-6 align-items-end justify-content-end'>
            <i className='col-2'><FontAwesomeIcon icon='fa-solid fa-user-tie'/></i>
            <i className='col-2'><FontAwesomeIcon icon='fa-brands fa-linkedin'/></i>
            <i className='col-2'><FontAwesomeIcon icon='fa-brands fa-github'/></i>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;
