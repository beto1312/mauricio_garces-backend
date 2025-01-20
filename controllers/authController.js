// ayuda para obtener el intellipsens
const { response } = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

// los controllers son basicamente las definiciones de
// los callbacks de los endpoints
const registerUser = async (req, res = response) => {
  // desestructurando el body de request
  const { email, password } = req.body;

  try {
    // buscamos un user con el mismo correo
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "There is already a user with this email address",
      });
    }

    // creando nuevo user
    user = new User({ ...req.body, rol: "user" });

    // encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // grabando en base de datos
    await user.save();

    // generar JWT
    const token = await generateJWT(user.id, user.name);

    return res.status(201).json({
      ok: true,
      msg: "register",
      uuid: user.id,
      name: user.name,
      address: user.address,
      phone: user.phone,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "contact your administrator",
    });
  }
};

const login = async (req, res = response) => {
  // desestructurando el body de request
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Email not registered",
      });
    }

    // booleano  si la password es la que esta almacenada
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(500).json({
        ok: false,
        msg: "Incorrect password",
      });
    }

    // generar JWT
    const token = await generateJWT(user.id, user.name, user.rol);

    return res.json({
      ok: true,
      msg: "login",
      uuid: user.id,
      name: user.name,
      address: user.address,
      phone: user.phone,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "contact your administrator",
    });
  }
};

const renew = async (req, res = response) => {
  // obteniendo el id y name de la request odificada por e middleware
  const { uid, name, rol } = req;

  try {

    const user = await User.findById(uid)

    // generando un nuevo token
    const token = await generateJWT(uid, name, rol);

    return res.json({
      ok: true,
      msg: "renew token",
      uuid: uid,
      name,
      address: user.address,
      phone: user.phone,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "contact your administrator",
    });
  }
};

module.exports = {
  registerUser,
  login,
  renew,
};
