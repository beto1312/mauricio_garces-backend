// rutas de eventos

const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validate-jwt");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/eventsController");
const { validarCampos } = require("../middlewares/validate-fields");
const isDate = require("../helpers/isDate");

const router = Router();

// aplica el middleware de validar token para todas las rutas
router.use(validarJWT);

// obtener eventos
router.get("/", getEvents);
router.post(
  "/new",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "start date is required").custom( isDate ),
    check("end", "end date is required").custom( isDate ),
    check("user", "user information is required").not(),
    validarCampos
  ],
  createEvent
);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
