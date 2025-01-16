// rutas de usuarios auth
const { Router } = require("express");

const { registerUser, login, renew } = require("../controllers/auth");

// ejecutamos la funcion Router
const router = Router();

// registro
router.post("/new", registerUser);

router.post("/", login);

router.get("/renew", renew);

module.exports = router;
