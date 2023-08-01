// controllers/gameController.js
const GameStats = require('../models/gameStats');

// Controller functions
exports.getGameStats = async (req, res) => {
  try {
    // Retrieve game stats from the database
    const gameStats = await GameStats.find();
    res.json(gameStats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve game stats' });
  }
};

exports.createGameStats = async (req, res) => {
  try {
    // Create a new game stats document in the database
    const newGameStats = await GameStats.create(req.body);
    res.json(newGameStats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create game stats' });
  }
};

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