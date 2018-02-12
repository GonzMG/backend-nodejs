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

function saveAnimal(req, res){
	var animal = new Animal();			//Instanciamos el modelo Animal
	var params = req.body;				//Cogemos los datos del body

	//Comprobamos si los datos con correctos
	if(params.name && params.description && params.year && params.user){
		animal.name = params.name;
		animal.description = params.description;
		animal.year = params.year;

		User.findOne({email: params.user}, (err, user_db) => {
			if(err){
				res.status(500).send({message: 'Error al guardar animal'});
			}else{
				if(user_db){
					animal.user = user_db;

					//datos correctos, almacenar animnal
					animal.save((err, animalStored) => {
						if(err){
							res.status(500).send({message: 'Error al guardar animal'});
						}else{
							if(!animalStored){
								res.status(404).send({message: 'No se ha guardado el animal'});
							}else{
								res.status(200).send({animal: animalStored});
							}
						}
					});
				}else{
					res.status(404).send({message: 'Usuario no existe'});
				}
			}
		});

	}else{
		res.status(200).send({
			message: 'Introduce los datos correctamente'
		});
	}
}

function getAnimalsByUser(req, res){
	
	var params = req.body;

	if(params.user){
		User.findOne({email: params.user}, (err, user_db) => {		//Buscamos el objeto del usuario
			if(err){
				res.status(500).send({message: 'Error al hacer la consulta por usuario'});
			}else{
				if(user_db){		//Si existe, buscamos TODOS los animales relacionados
					Animal.find({user: user_db}).exec((err,animal_db) => {
						if(err){
							res.status(500).send({message: 'Error al hacer la consulta por animal'});
						}else{
							if(animal_db){
								res.status(200).send({animal_db});
							}else{
								res.status(404).send({message: 'El usuario no tiene animales'});
							}
						}
					});
				}else{
					res.status(404).send({message: 'El usuario no existe'});
				}
			}
		});
	}else{
		res.status(200).send({
			message: 'Introduce bien el usuario'
		});
	}	
}



module.exports = {
	pruebasAnimal,
	saveAnimal,
	getAnimalsByUser
};