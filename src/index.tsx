import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import Home from './home/Home';
import registerServiceWorker from './registerServiceWorker';
import Tipping from './tipping/Tipping';
import { firebaseStore } from './firebase/firebaseSetup';
import Games from './games/Games';

ReactDOM.render(
    <Router>
        <Provider store={firebaseStore}>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/tipping" component={Tipping} />
                <Route path="/games" component={Games} />
            </div>
        </Provider>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
