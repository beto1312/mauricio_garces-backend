const { response } = require("express");
const Event = require("../models/eventModel");

// obtener los eventos
const getEvents = async (req, res = response) => {
  // Obtenemos el uid y el rol del usuario de la solicitud
  const { uid, rol } = req;

  let events;

  if (rol === "admin") {
    // Si el usuario es administrador, obtiene todos los eventos
    events = await Event.find().populate("user", [
      "name",
      "address",
      "phone",
      "email",
    ]);
  } else {
    // Si no es administrador, obtiene solo los eventos creados por el usuario
    events = await Event.find({ user: uid }).populate("user", [
      "name",
      "address",
      "phone",
      "email",
    ]);
  }

  return res.json({
    ok: true,
    eventos: events,
  });
};

// obtener las horas disponibles de acuerdo a los eventos en la misma fecha
const getAvailableHours = async (req, res = response) => {
  try {
    const { date } = req.body;

    // Convertir la fecha a un objeto Date
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    // Obtener el inicio y fin del día seleccionado
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Buscar eventos que coincidan con la fecha seleccionada
    const events = await Event.find({
      start: { $gte: startOfDay, $lte: endOfDay },
    });

    // Crear un array con las horas ocupadas
    const occupiedIntervals = events.map((event) => ({
      start: event.startHour,
      end: event.endHour,
    }));

    // Rango de horas del día (0 - 23)
    const allHours = Array.from({ length: 24 }, (_, i) => i);

    // Calcular horas disponibles
    const currentHour = new Date().getHours();
    const availableHours = allHours.filter((hour) => {
      const isPastHour =
        selectedDate.toDateString() === new Date().toDateString() &&
        hour < currentHour;

      return (
        !occupiedIntervals.some(
          (interval) => hour >= interval.start && hour < interval.end
        ) && !isPastHour
      );
    });

    return res.json({ ok: true, msg: "hours retrieved", availableHours });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

// registrar un evento
const createEvent = async (req, res = response) => {
  // creando un nuevo objeto modelo
  const event = new Event({
    ...req.body,
    user: req.uid,
    comments: req?.comments || "",
  });

  try {
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
    const eventUpdated = await Event.findByIdAndUpdate(eventoId, newEvent, {
      new: true,
    });

    return res.json({
      ok: true,
      msg: "Event updated",
      eventUpdated,
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

  const rol = req.rol;

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
    if (event.user.toString() !== uidUserRequest && rol !== "admin") {
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

//

module.exports = {
  getEvents,
  getAvailableHours,
  createEvent,
  updateEvent,
  deleteEvent,
};
