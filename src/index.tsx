import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Home from './home/Home';
import registerServiceWorker from './registerServiceWorker';
import Tipping from './tipping/Tipping';
import Games from './games/Games';
import Director from './Director';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Director} />
      <Route path="/home" component={Home} />
      <Route path="/tipping" component={Tipping} />
      <Route path="/games" component={Games} />
    </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
