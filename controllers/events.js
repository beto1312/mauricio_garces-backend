const { response } = require("express");
const Event = require("../models/event");

// obtener los eventos
const getEvents = async (req, res = response) => {
  // obtiene todos los eventos
  // hace una especie de join en el campo user, indicamos que aparte del id (que siempre viene)
  // solo queremos el nombre
  const eventos = await Event.find().populate("user", "name");

  return res.json({
    ok: true,
    eventos,
  });
};

// registrar un evento
const createEvent = async (req, res = response) => {
  // creando un nuevo objeto modelo
  const event = new Event(req.body);

  try {
    // seteando la informacion del user (en el middleware de valicacion de JWT se le adjunta el id)
    event.user = req.uid;

    const savedEvent = await event.save();

    return res.json({
      ok: true,
      msg: "evento creado",
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "comuniquese con su administrador",
    });
  }
};

//actualizr evento
const updateEvent = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "actualizar evento",
  });
};

// eliminar evento
const deleteEvent = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "eliminar evento",
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
