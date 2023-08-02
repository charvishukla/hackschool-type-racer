// controllers/gameController.js
const GameStats = require('../models/gameStats');

// Controller functions

// simply get ststas
// R
exports.getGameStats = async (req, res) => {
  try {
    const gameStats = await GameStats.find();
    res.json(gameStats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve game stats' });
  }
};

// create a new doc 
// C
exports.createGameStats = async (req, res) => {
  try {
    // Create a new game stats document in the database
    const newGameStats = await GameStats.create(req.body);
    res.json(newGameStats);
  } catch (error) { // or throw weeor 
    res.status(500).json({ error: 'Failed to create game stats' });
  }
};


// dont really need this rn but i have this just in case we wanna add features 
// U
exports.updateGameStats = async (req, res) => {
  try {
    // Update the game stats document in the database
    const updatedGameStats = await GameStats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedGameStats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update game stats' });
  }
};