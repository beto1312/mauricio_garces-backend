// ayuda para obtener el intellipsens
const { response } = require("express");

// obteniendo la funcion que checkea el resultado de la validaciones
const { validationResult } = require("express-validator");

// los controllers son basicamente las definiciones de
// los callbacks de los endpoints
const registerUser = (req, res = response) => {
  // enviando la request a las reglas de validacion
  const errors = validationResult(req);

  // si el array de errores no esta vacío
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  // desestructurando el body de request
  const { name, email, password } = req.body;

  return res.json({
    ok: true,
    msg: "register",
    name,
    email,
    password,
  });
};

const login = (req, res = response) => {
  // enviando la request a las reglas de validacion
  const errors = validationResult(req);

  // si el array de errores no esta vacío
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

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
