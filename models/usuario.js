const { Schema, Model, model } = require("mongoose");

// definicion del esquema de la coleccion usuario
const usuarioSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = model("Usuario", usuarioSchema);
