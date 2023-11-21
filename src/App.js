import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
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
      <div className='container-md bg-light border border-warning'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt tempore optio facere! Recusandae, qui sequi,
        corporis ad earum aspernatur blanditiis repellendus ratione magnam, fugit modi optio iste laudantium facere
        possimus. Eum, at! Soluta ipsa quasi, autem doloremque facere magnam molestias excepturi exercitationem
        repudiandae ipsam eligendi! Vero sit esse similique placeat! Tenetur debitis dolores harum blanditiis vel ad,
        voluptate distinctio. Alias. Eum iusto minus nesciunt impedit, velit, ut earum numquam excepturi quisquam
        provident expedita officiis nisi enim saepe id nihil asperiores repellendus possimus eveniet. Quasi repellat
        ducimus hic maxime quas obcaecati. Molestiae facere aliquid possimus tempore? Quasi assumenda, exercitationem
        nostrum reprehenderit veniam natus eos explicabo dolorum asperiores officia modi a, sequi aliquam fuga expedita,
        accusamus id consequatur aspernatur beatae? Nesciunt, asperiores. Excepturi similique omnis voluptas deleniti
        rem culpa accusantium cumque sed dolorum nostrum, perferendis assumenda reiciendis, voluptatum nemo itaque ut.
        Magnam veritatis assumenda impedit doloribus voluptatem minima quia odit quos sed!
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
