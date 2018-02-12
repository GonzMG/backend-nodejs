'use strict'

//Modelos
var User = require('../models/user');
var Animal = require('../models/animal');

//Acciones
function pruebasAnimal(req, res){
	res.status(200).send({
		message: 'Probando el controlador de animal y la accion pruebas'
	});
}



module.exports = {
	pruebasAnimal
};