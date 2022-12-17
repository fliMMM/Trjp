const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  type: { type: String, require: true },
  cityName: { type: String, require: true },
  cityId: { type: String, require: true },
  name: { type: String, require: true },
  addressLine1: { type: String, require: true },
  addressLine2: { type: String, require: true },
  coordinates: { type: Array, default: [] },
  thumbnail: { type: String, default: "" },
  description: { type: String, default: "" },
  tickets:{type: Array}
});

module.exports = mongoose.model("place", PlaceSchema);
