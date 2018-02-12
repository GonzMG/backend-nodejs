'use strict'

//Modulos
var bcrypt = require('bcrypt-nodejs');

//Modelos
var User = require('../models/user');

//Acciones
function pruebas(req, res){
	res.status(200).send({
		message: 'Probando el controlador de usuarios y la accion pruebas'
	});
}

function saveUser(req, res){

	//Creamos el objeto
	var user = new User();

	//Cogemos los parametros de la peticion
	var params = req.body;
	//console.log(params);

	//Comprobar si han llegado los datos
	if(params.password && params.name && params.surname && params.email){
		//Asignacion de valores
		user.name = params.name;
		user.surname = params.surname;
		user.email = params.email;
		user.role = 'ROLE_USER';
		user.image = null;

		//Comprobar si el usuario existe
		User.findOne({email: user.email.toLowerCase()}, (err,user_db) => {
			if(err){
				res.status(500).send({message: 'Error al guardar usuario'});
			}else{
				if(!user_db){	// La consulta anterior no ha devuelto nada
								// por lo que podemos almacenar el usuario
								// ya que no esta repetido

					//Cifrado de contrasenya
					bcrypt.hash(params.password, null, null, function(err, hash){
						user.password = hash;		//Hash contiene la password cifrada

						//Almacenar el usuario
						user.save((err, userStored) => {
							if(err){
								res.status(500).send({message: 'Error al guardar usuario'});
							}else{
								if(!userStored){
									res.status(404).send({message: 'No se ha registrado el user'});
								}else{
									res.status(200).send({user: userStored});
								}
							}
						});
					});
				}else{
					res.status(200).send({
						message: 'Usuario ya ha sido registrado'
					});
				}
			}
		});

	}else{
		res.status(200).send({
			message: 'Introduce los datos correctamente'
		});
	}

	
}

function getKeepers(req, res){
	User.find({role: 'ROLE_ADMIN'}).exec((err, users) => {
		if(err){
			res.status(500).send({message: 'Error al consultar cuidadores'});
		}else{
			if(!users){
				res.status(404).send({message: 'No existen cuidadores'});
			}else{
				res.status(200).send({users})
			}
		}
	});
}

module.exports = {
	pruebas,
	saveUser,
	getKeepers
};