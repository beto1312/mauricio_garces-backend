// importamos express
const express = require("express");
require('dotenv').config();

// creamos el server de express (se hace como una función)
const app = express();

// Directorio publico
// use es un middleware de express
app.use( express.static('public') )

// lectura y paseo del body de la request
// use es un middleware, indicamos que todo lo que recibamos
// debe pasar por el parseo de json
app.use( express.json() ) 

// rutas
// todo lo que tenga /api/auth irá a las rutas de auth.js, como un fgrupo derutas
app.use( '/api/auth', require('./routes/auth') )


// escuchar peticiones, primer arg es el puerto
// 2do arg es el callback a ejecutar cuando este levantado el server
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo");
});
