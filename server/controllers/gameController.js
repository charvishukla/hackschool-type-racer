const Game = require('../models/gameModel');

exports.createGame = async (req, res) => {
  const game = new Game({
    _id: req.body.id,
    text: req.body.text,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    length: req.body.length,
    currIndex: req.body.currIndex,
    currChar: req.body.currChar,
    correctChar: req.body.correctChar,
    errorChar: req.body.errorChar,
    phase: req.body.phase
  });
  try {
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getGame = async (req, res) => {
    try {
      const game = await Game.findOne({ _id: req.params.id });
      if (!game) return res.status(404).json({ error: "Game not found" });
      res.status(200).json(game);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }