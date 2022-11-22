const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  user: { type: Object, require: true },
  media: { type: String },
  content: { type: String, require: true },
  tag: { type: Array, require: true },
  eventId: { type: Array },
  upVote: { type: Number, default: 0 },
  dowVote: { type: Number, default: 0 },
});

module.exports = mongoose.model("blog", BlogSchema);
