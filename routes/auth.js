// rutas de usuarios auth
const { Router } = require("express");

// importacion de check de express validator
const { check } = require("express-validator");
const { registerUser, login, renew } = require("../controllers/authController");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

// ejecutamos la funcion Router
const router = Router();

// registro de usuario
router.post(
  "/new",
  [
    // que el name sea obligatorio y no este vacio
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 5 }),
    validateFields,
  ],
  registerUser
);

// login
router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 5 }),
    validateFields,
  ],
  login
);

// renovar token
router.get("/renew", validateJWT, renew);

module.exports = router;
