const { Schema, model } = require("mongoose");

const eventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  },
});

// modificando que no se use "_id" y se ude "id".
// cuando usamos un objeto de mongo, lo que hace mongoose
// es usar el toJSON, de esta forma alteramos la forma de verlo aquí en mongoose
// en mongo disug teniendo el _id
eventSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Event", eventSchema);
