'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/pruebas-del-controlador', UserController.pruebas);	//GET del metodo pruebas de user
api.post('/register', UserController.saveUser);					//POST del metodo saveUser de user

module.exports = api;