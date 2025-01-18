const moment = require("moment");

const isDate = (value) => {
  if (!value) {
    return false;
  }

  // crea una instancia de moment (libreria de fechas)
  // para poder saber si es una fecha
  const date = moment(value);

  // retorna su es una fecha valida o no
  return date.isValid();
};

module.exports = isDate;
