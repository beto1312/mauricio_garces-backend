// importamos express
const express = require("express");
require('dotenv').config();

// creamos el server de express (se hace como una función)
const app = express();

// rutas
// los callbacks reciben el request y el response
// app.get("/", (req, res) => {
//   return res.json({
//     ok: true,
//     saludo: "saludando ando",
//     nombre: "Humberto de la cruz dominguez",
//     edad: 22,
//   });
// });

// Directorio publico
// use es un middleware de express
app.use( express.static('public') )

// escuchar peticiones, primer arg es el puerto
// 2do arg es el callback a ejecutar cuando este levantado el server
app.listen(4000, () => {
  console.log("Servidor corriendo");
  console.log(process.env.PORT)
});
