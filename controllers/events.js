const { response } = require("express");

// obtener los eventos
const getEvents = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "Obtener eventos",
  });
};

// registrar un evento
const createEvent = (req, res = response) => {
  console.log(req.body);

  return res.json({
    ok: true,
    msg: "crear evento",
  });
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
