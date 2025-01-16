// ayuda para obtener el intellipsens
const { response } = require("express");

// los controllers son basicamente las definiciones de
// los callbacks de los endpoints
const registerUser = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "register",
  });
};

const login = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "login",
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
