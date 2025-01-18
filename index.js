// importamos express
const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");
const cors = require("cors");

// creamos el server de express
const app = express();

// funcion de coneccion a base de datos
dbConnection();

// configuracion cors
app.use(cors());

// Directorio publico
// use es un middleware de express
app.use(express.static("public"));

// lectura y paseo del body de la request
app.use(express.json());

// rutas
// rutas de auth
app.use("/api/auth", require("./routes/auth"));
// rutas de eventos
app.use("/api/events/", require("./routes/events"));

// escuchar peticiones, primer arg es el puerto
// 2do arg es el callback a ejecutar cuando este levantado el server
app.listen(process.env.PORT, () => {
  console.log("Server running");
});
