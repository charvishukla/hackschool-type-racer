const mongoose = require('mongoose');

const gameStatsSchema = new mongoose.Schema({
  sentence: { type: String }, 
  correctChars: {type: Number}, 
  wpm : {type: Number}, 
  time: {type: Number}
  // startTime: { type: Date },
  // endTime: { type: Date },
  // chars: { type: String },
  // charsState: { type: [Number] },
  // length: { type: Number },
  // currIndex: { type: Number },
  // currChar: { type: String },
  // correctChar: { type: String },
  // errorChar:x { type: String },
  // phase: { type: Number, enum: [0, 1, 2] },
});

const GameStats = mongoose.model('GameStats', gameStatsSchema);

module.exports = GameStats;