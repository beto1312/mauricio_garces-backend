// rutas de eventos

const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const isDate = require("../helpers/isDate");

const router = Router();

// aplica el middleware de validar token para todas las rutas
router.use(validarJWT);

// obtener eventos
router.get("/", getEvents);
router.post(
  "/new",
  [
    check("title", "el titulo es requerido").not().isEmpty(),
    check("start", "la fecha de inicio es requerida").custom( isDate ),
    check("end", "la fecha de fin es requerida").custom( isDate ),
    check("user", "la informacion de usuario es requerida").not(),
    validarCampos
  ],
  createEvent
);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
