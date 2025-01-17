// ayuda para obtener el intellipsens
const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

// los controllers son basicamente las definiciones de
// los callbacks de los endpoints
const registerUser = async (req, res = response) => {
  // desestructurando el body de request
  const { email, password } = req.body;

  try {
    // buscamos un usuario con el mismo correo
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo electronico",
      });
    }

    // creando nuevo usuario
    usuario = new Usuario(req.body);

    // encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // grabando en base de datos
    await usuario.save();

    return res.status(201).json({
      ok: true,
      msg: "register",
      uuid: usuario.id,
      name: usuario.name,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: "comuniquese con su administrador",
    });
  }
};

const login = (req, res = response) => {
  // desestructurando el body de request
  const { email, password } = req.body;

  return res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const renew = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  registerUser,
  login,
  renew,
};
