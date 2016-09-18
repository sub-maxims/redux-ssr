import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HelloComponent from './components/Hello.js';
import helloReducer from './components/hello-reducer';


// Grab the state from a global injected into server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(helloReducer, preloadedState);


render(
    <Provider store={store}>
        <HelloComponent />
    </Provider>, 
    document.getElementById('app')
);