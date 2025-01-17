// rutas de usuarios auth
const { Router } = require("express");

// importacion de check de express validator
// check, checkea que ciertos campos se encuentren en el body de la request
// con ciertas reglas de validacion
const { check } = require("express-validator");

const { registerUser, login, renew } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

// ejecutamos la funcion Router
const router = Router();

// registro de usuario
router.post(
  "/new",
  [
    // que el name sea obligatorio y no este vacio
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es olbigatorio").isEmail(),
    check("password", "La contrasena es obligatoria").isLength({ min: 5 }),
    validarCampos,
  ],
  registerUser
);

// login
router.post(
  "/",
  [
    check("email", "El correo es olbigatorio").isEmail(),
    check("password", "La contrasena es obligatoria").isLength({ min: 5 }),
    validarCampos,
  ],
  login
);

// renovar token
router.get("/renew", validarJWT, renew);

module.exports = router;
