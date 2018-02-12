'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//rutas
var user_routes = require('./routes/user');

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cabeceras y cors

//rutas base
app.use('/api', user_routes);

module.exports = app;