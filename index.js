"use strict";

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const COLOR = config.COLOR_LOGGER;

mongoose.connect(config.db, (err, res) => {
  if(err)
    return console.log(COLOR.red,`Error al conectar a la base de datos: ${err}`);

  console.log(COLOR.yellow,"Conexion a la base de datos establecida...");

  app.listen( config.port ,function(){
    console.log( COLOR.yellow,'Escuchando en el puerto ' + config.port)
  });
})
