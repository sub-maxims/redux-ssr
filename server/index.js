import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import PopularContainer from '../Components/PopularContainer';
import popularReducer from '../Components/popular-reducer';
import { getItems } from '../Components/popular-api';
import fetch from 'isomorphic-fetch';

const publicPath = path.resolve(__dirname, '../views');
const app = express();
const port = process.env.PORT || 3000;
    
app.use(express.static('public'));
app.engine('tpl', function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(new Error(err));
    
        let rendered = content
                        .toString()
                        .replace('#title#', options.title)
                        .replace('#body#', options.body)
                        .replace('#preloadedState#', options.preloadedState);

        return callback(null, rendered);
    });
});
app.set('views', publicPath); 
app.set('view engine', 'tpl');
app.get('/', (req, res) => {
    getItems().then(data => {
        const preloadedState = {
            items: data
        };
        const store = createStore(
            popularReducer, 
            preloadedState,
            applyMiddleware(thunkMiddleware)
        );
        const bodycomp = renderToString(
            <Provider store={store}>
                <PopularContainer />
            </Provider>
        );
        const initialReduxState = JSON.stringify(store.getState());

        res.render('index', {title: 'server side React', body: bodycomp, preloadedState: initialReduxState});
    });
});
app.listen(port, () => {
    console.log(port);
});