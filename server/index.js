import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import reactDomServer from 'react-dom/server';
import HelloComponent from '../Components/Hello';

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
                        .replace('#body#', options.body);

        return callback(null, rendered);
    });
});
app.set('views', publicPath); 
app.set('view engine', 'tpl');

app.get('/', (req, res) => {
    const bodycomp = reactDomServer.renderToString(<HelloComponent />);
    res.render('index', {title: 'server side React', body: bodycomp});
});

app.listen(port, () => {
    console.log(port);
});