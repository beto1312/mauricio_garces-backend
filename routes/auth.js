// rutas de usuarios auth
const { Router } = require("express");

// importacion de check de express validator
// check, checkea que ciertos campos se encuentren en el body de la request
// con ciertas reglas de validacion
const { check } = require("express-validator");

const { registerUser, login, renew } = require("../controllers/auth");

// ejecutamos la funcion Router
const router = Router();

// registro
router.post(
  "/new",
  [
    // que el name sea obligatorio y no este vacio
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es olbigatorio").isEmail(),
    check("password", "La contrasena es obligatoria").isLength({ min: 5 }),
  ],
  registerUser
);

router.post(
  "/",
  [
    check("email", "El correo es olbigatorio").isEmail(),
    check("password", "La contrasena es obligatoria").isLength({ min: 5 }),
  ],
  login
);

router.get("/renew", renew);

module.exports = router;
