'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();

api.get('/pruebas-del-animal', AnimalController.pruebasAnimal);
api.post('/register-animal', AnimalController.saveAnimal);
api.post('/mostrar-animal', AnimalController.getAnimalsByUser);

module.exports = api;