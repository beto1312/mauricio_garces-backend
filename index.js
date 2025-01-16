// importamos express
const express = require("express");

// creamos el server de express (se hace como una función)
const app = express();

// rutas
// los callbacks reciben el request y el response
app.get("/", (req, res) => {
  return res.json({
    ok: true,
    saludo: "saludando ando",
    nombre: "Humberto de la cruz dominguez",
    edad: 22,
  });
});

// escuchar peticiones, primer arg es el puerto
// 2do arg es el callback a ejecutar cuando este levantado el server
app.listen(4000, () => {
  console.log("Servidor corriendo");
});
