import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import { createStore,compose,combineReducers,applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import RootReducer from '../imports/redux/reducers/root-reducer';

import { routerForBrowser } from 'redux-little-router';

import HomePage from "../imports/components/App";

import { initializeCurrentLocation } from 'redux-little-router';
import Dashboard from "../imports/components/IndexPage/IndexPageContainer";
import { Cookies } from 'meteor/ostrio:cookies';


export const cookies = new Cookies();

const routes = {
    '/': {
        title: 'Home',
    },
    '/login': {
        title: 'Login-page',
        basename:'login'
    },
    '/dashboard': {
        title: 'Dashboard',
    },
    '/visualized': {
        title: 'Visualized',
    },
};


const {reducer, middleware, enhancer} = routerForBrowser({routes});

const store = createStore(
    combineReducers({ router: reducer, RootReducer }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ,
    compose(enhancer, applyMiddleware(middleware))
);

// ...after creating your store
const initialLocation = store.getState().router;
if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation));
}

//const store = createStore(RootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

Meteor.startup(() => {
    render(<Provider store={store}>
        <HomePage/>
    </Provider>, document.getElementById('app'));
});

