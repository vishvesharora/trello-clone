const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

boardSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Board', boardSchema);
