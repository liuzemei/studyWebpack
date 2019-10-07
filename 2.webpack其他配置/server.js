const express  = require('express');
let app = express();

const webpack = require('webpack');
const middle = require('webpack-dev-middleware');

const config = require('./webpack.config.js');

let compiler = webpack(config);

app.use(middle(compiler));

app.get('/user', (req,res) => {
    res.json({name: 'LZM1'})
})

app.listen(3000);