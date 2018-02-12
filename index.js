'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.connect('mongodb://localhost:27017/zoo', (err,res) =>{
	if(err){
		throw err;
	}else{
		console.log('La conexion a zoo se realizo con exito...');

		//Conexion con el servidor
		app.listen(port, () => {
			console.log('Servidor local en funcionamiento...');
		});
	}
})
