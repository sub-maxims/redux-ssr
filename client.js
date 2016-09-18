import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import PopularContainer from './components/PopularContainer';
import popularReducer from './components/popular-reducer';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(
    popularReducer, 
    preloadedState,
    applyMiddleware(thunkMiddleware)
);

render(
    <Provider store={store}>
        <PopularContainer />
    </Provider>, 
    document.getElementById('app')
);