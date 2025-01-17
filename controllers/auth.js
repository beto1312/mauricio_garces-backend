// ayuda para obtener el intellipsens
const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

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

    // generar JWT
    const token = await generateJWT(usuario.id, usuario.name);

    return res.status(201).json({
      ok: true,
      msg: "register",
      uuid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "comuniquese con su administrador",
    });
  }
};

const login = async (req, res = response) => {
  // desestructurando el body de request
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Email no registrado",
      });
    }

    // booleano  si la password es la que esta almacenada
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(500).json({
        ok: false,
        msg: "contraseña incorrecta",
      });
    }

    // generar JWT
    const token = await generateJWT(usuario.id, usuario.name);

    return res.json({
      ok: true,
      msg: "login",
      uuid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "comuniquese con su administrador",
    });
  }
};

const renew = async (req, res = response) => {
  // obteniendo el id y name de la request odificada por e middleware
  const { uid, name } = req;

  try {
    // generando un nuevo token
    const token = await generateJWT(uid, name);

    return res.json({
      ok: true,
      msg: "renew token",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "comuniquese con su administrador",
    });
  }
};

module.exports = {
  registerUser,
  login,
  renew,
};
