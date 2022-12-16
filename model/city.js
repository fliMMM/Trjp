const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: { type: String, require: true },
  title: { type: String, require: true },
  thumbnail: {type: String}
});

module.exports = mongoose.model("city", CitySchema);
