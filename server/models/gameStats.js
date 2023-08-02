console.log("Loading gameStatsSchema schema...")
const mongoose = require('mongoose');

// this is basically what will go inside each document inside our db 
// the model represents a structured schema for a collection, and allows us to do crud lmao
const gameStatsSchema = new mongoose.Schema({
  sentence: { type: String }, 
  correctcharacters: {type: Number}, 
  incorrectcharacters:{ type: Number},
  wpm : {type: Number}, 
  time: {type: Number}
});

// creates a model for a MongoDB collection named "GameStats"
const GameStats = mongoose.model('GameStats', gameStatsSchema);

module.exports = GameStats; // exporttt slayyy