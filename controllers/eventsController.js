const { response } = require("express");
const Event = require("../models/event");

// obtener los eventos
const getEvents = async (req, res = response) => {
  // obtiene todos los eventos
  // hace una especie de join en el campo user, indicamos que aparte del id (que siempre viene)
  // solo queremos el nombre
  const events = await Event.find().populate("user", "name");

  return res.json({
    ok: true,
    eventos: events,
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
      msg: "created event",
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contact your administrator",
    });
  }
};

//actualizr evento
const updateEvent = async (req, res = response) => {
  // obteniendo el parametro de ruta
  const eventoId = req.params.id;

  const uidUserRequest = req.uid;

  try {
    // verificar que el id recibido existe en la base de datos
    const event = await Event.findById(eventoId);

    // si no existe
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "There is no event with the provided id",
      });
    }

    // si la persona que creo el evento no es la misma que lo quiere actualizar
    if (event.user.toString() !== uidUserRequest) {
      return res.status(401).json({
        ok: false,
        msg: "You are not authorized to update the event",
      });
    }

    // creando el nuevo evento
    const newEvent = {
      ...req.body,
      user: uidUserRequest,
    };

    // {new: true} indica que queremos obtener el documento nuevo (actualizado)
    // si no tuviera eso, devolveria el viejito
    const eventpActualizado = await Event.findByIdAndUpdate(
      eventoId,
      newEvent,
      { new: true }
    );

    return res.json({
      ok: true,
      msg: "Event updated",
      eventpActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contact your administrator",
    });
  }
};

// eliminar evento
const deleteEvent = async (req, res = response) => {
  // obteniendo el parametro de ruta
  const eventoId = req.params.id;

  const uidUserRequest = req.uid;

  try {
    // verificar que el id recibido existe en la base de datos
    const event = await Event.findById(eventoId);

    // si no existe
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "There is no event with the provided id",
      });
    }

    // si la persona que creo el evento no es la misma que lo quiere eliminar
    if (event.user.toString() !== uidUserRequest) {
      return res.status(401).json({
        ok: false,
        msg: "You are not authorized to delete the event",
      });
    }

    // obtiene el documento eliminado
    const eventDeleted = await Event.findByIdAndDelete(eventoId);

    return res.json({
      ok: true,
      msg: "Deleted event",
      eventDeleted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Contact your administrator",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
