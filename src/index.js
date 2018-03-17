import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Tipping from './tipping/Tipping';
import { firebaseStore } from './common/firebaseSetup';
import SignInScreen from './common/SignInScreen';

ReactDOM.render(
    <Router>
        <Provider store={firebaseStore}>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/tipping" component={Tipping} />
                <Route path="/signIn" component={SignInScreen} />
            </div>
        </Provider>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
