import * as firebase from 'firebase';
import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';

export default firebase.initializeApp({
    apiKey: 'AIzaSyAxWuNeT7IubNAGpMHYBXPteUNqun4cb-M',
    authDomain: 'scottdbnet.firebaseapp.com',
    databaseURL: 'https://scottdbnet.firebaseio.com',
    projectId: 'scottdbnet',
    storageBucket: 'scottdbnet.appspot.com',
    messagingSenderId: '475516591163'
});

const rrfConfig = {};

const createStoreWithFirebase = compose(reactReduxFirebase(firebase, rrfConfig))(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer
});

const initialState = {};
export const firebaseStore = createStoreWithFirebase(rootReducer, initialState);
