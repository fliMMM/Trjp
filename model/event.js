const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String, require: true },
  startTime: { type: String, require: true },
  duration: { type: String, require: true },
  thumbnail: { type: String, require: true },
  coordinate: { type: Array },
  addressDetail: { type: Array, require: true },
  tag: { type: Array, require: true },
  description: {type: String, require: true}
});

module.exports = mongoose.model("event", EventSchema);
