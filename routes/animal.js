'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();

api.get('/pruebas-del-animal', AnimalController.pruebasAnimal);	//GET del metodo pruebas de user

module.exports = api;