const mongoose = require('mongoose');

const Game = new mongoose.Schema({
  text: String,
  startTime: Number,
  endTime: Number,
  length: Number,
  currIndex: Number,
  currChar: String,
  correctChar: Number,
  errorChar: Boolean,
  phase: Number
})

module.exports = mongoose.model('Game', Game);