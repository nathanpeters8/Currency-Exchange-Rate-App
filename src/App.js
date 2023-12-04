import Home from './Home';
import Converter from './Converter';
import ExchangeRate from './ExchangeRate';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faRepeat, faUserTie, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';

library.add(faGithub, faRepeat, faLinkedin, faUserTie, faArrowRight);

function App() {
  return (
    <Router basename='/Currency-Exchange-Rate-App'>
      <nav className='navbar bg-dark navbar-dark py-0 mb-2'>
        <div className='container-fluid flex-column align-items-center'>
          <Link to='/' className='navbar-brand text-decoration-underline'>
            CurrExchange
          </Link>
          <span className='navbar-text'>Free Currency Converter and Exchange Rates</span>
        </div>
      </nav>
      <Home />
      <footer className='container-fluid bg-dark text-white mt-5'>
        <div className='row d-flex justify-content-around align-items-center'>
          <div className='col-6 d-flex'>
            <h6 className='mb-0'>Created by Nathan Peters</h6>
          </div>
          <div className='h3 d-flex col-6 justify-content-end'>
            <a
              title='LinkedIn'
              className='col-2 col-lg-1 text-white'
              href='https://www.linkedin.com/in/nathan-peters8/'
            >
              <FontAwesomeIcon icon='fa-brands fa-linkedin' />
            </a>
            <a title='GitHub' className='col-2 col-lg-1 text-white' href='https://github.com/nathanpeters8'>
              <FontAwesomeIcon icon='fa-brands fa-github' />
            </a>
            <a title='Portfolio' className='col-2 col-lg-1 text-white' href='https://portfolio.nathan-peters.me/'>
              <FontAwesomeIcon icon='fa-solid fa-user-tie' />
            </a>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;
