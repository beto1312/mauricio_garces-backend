// rutas de eventos

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");

const router = Router();

// aplica el middleware de validar token para todas las rutas
router.use( validarJWT );

// obtener eventos
router.get("/", getEvents);
router.post("/new", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
