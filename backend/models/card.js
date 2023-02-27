const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  board: { type: mongoose.Types.ObjectId, required: true, ref: 'Board' }
});

module.exports = mongoose.model('Card', cardSchema);
