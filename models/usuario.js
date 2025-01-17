const { Schema, Model, model } = require("mongoose");

// definicion del esquema de la coleccion usuario
const usuarioSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("Usuario", usuarioSchema);
