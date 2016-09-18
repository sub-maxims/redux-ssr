import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import counterApp from './reducers'
// import App from './containers/App'

import HelloComponent from '../Components/Hello';
import helloReducer from '../Components/hello-reducer';

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
    // Create a new Redux store instance
    const store = createStore(helloReducer);
    const bodycomp = renderToString(
        <Provider store={store}>
            <HelloComponent />
        </Provider>
    );
    // Grab the initial state from our Redux store
    const preloadedState = JSON.stringify(store.getState());

    res.render('index', {title: 'server side React', body: bodycomp, preloadedState: preloadedState});
});

app.listen(port, () => {
    console.log(port);
});