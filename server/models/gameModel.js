const mongoose = require('mongoose');

const Game = new mongoose.Schema({
  _id: Number,
  text: String,
  startTime: Number,
  endTime: Number,
  length: Number,
  currIndex: Number,
  currChar: String,
  correctChar: Boolean,
  errorChar: Boolean,
  phase: Number
})

module.exports = mongoose.model('Game', Game);