import * as firebase from 'firebase';
import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';

export default firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
});

const rrfConfig = {};

const createStoreWithFirebase = compose(reactReduxFirebase(firebase, rrfConfig))(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer
});

const initialState = {};
export const firebaseStore = createStoreWithFirebase(rootReducer, initialState);
