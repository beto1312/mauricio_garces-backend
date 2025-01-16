// ayuda para obtener el intellipsens
const { response } = require("express");

// los controllers son basicamente las definiciones de
// los callbacks de los endpoints
const registerUser = (req, res = response) => {
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
