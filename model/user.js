const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phone: {type: String},
  password: { type: String },
  email: {type: String, require: true}
}, {timestamps:true})


module.exports = mongoose.model('User', UserSchema)