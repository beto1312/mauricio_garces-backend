const mongoose = require("mongoose");
require("dotenv").config();

// coneccion a base de datos
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("database connected");
  } catch (error) {
    console.log(error);
    throw new Error("database connection failed");
  }
};

module.exports = {
    dbConnection
}