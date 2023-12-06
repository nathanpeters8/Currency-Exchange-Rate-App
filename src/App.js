import Home from './Home';
import Converter from './Converter';
import ExchangeRate from './ExchangeRate';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faRepeat, faUserTie, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';

// font awesome library for easy access to icons
library.add(faGithub, faRepeat, faLinkedin, faUserTie, faArrowRight);

// App component houses the navbar, Home component, and the footer
function App() {
  return (
    <Router basename='/Currency-Exchange-Rate-App' id='app'>
      {/* Navbar */}
      <nav className='navbar py-0'>
        <div className='container-fluid flex-column align-items-center'>
            <span className='fw-bold text-capitalize h2'>CurrExchange</span>
            <span className='navbar-text fw-light font-monospace text-white text-center'>Free Currency Converter and Exchange Rates</span>
        </div>
      </nav>
      {/* Home component (houses main content) */}
      <Home />
      {/* Footer */}
      <footer className='container-fluid text-white mt-5'>
        <div className='row d-flex justify-content-around align-items-center'>
          {/* Signature */}
          <div className='col-6 d-flex'>
            <h6 className='mb-0 small '>Created by Nathan Peters</h6>
          </div>
          {/* Social links */}
          <div className='h3 d-flex col-4 col-md-3 justify-content-around'>
            {/* Linkedin */}
            <a
              title='LinkedIn'
              className='col-2 col-lg-1 text-white'
              href='https://www.linkedin.com/in/nathan-peters8/' target='_blank'
            >
              <FontAwesomeIcon icon='fa-brands fa-linkedin' />
            </a>
            {/* Github */}
            <a title='GitHub' className='col-2 col-lg-1 text-white' href='https://github.com/nathanpeters8' target='_blank'>
              <FontAwesomeIcon icon='fa-brands fa-github' />
            </a>
            {/* Personal Portfolio */}
            <a title='Portfolio' className='col-2 col-lg-1 text-white' href='https://portfolio.nathan-peters.me/' target='_blank'>
              <FontAwesomeIcon icon='fa-solid fa-user-tie' />
            </a>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;
