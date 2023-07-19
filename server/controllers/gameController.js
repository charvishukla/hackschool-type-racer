const Game = require("../models/GameModel")
const { useTypingGame } = require('react-typing-game-hook');


getTypeRacerData = (req, res) => {
    const {
      timeRemaining,
      characters,
      userInput,
      accuracy,
      wpm,
    } = useTypingGame();
  
    // Create a TypeRacer document with the game data
    const typeRacerData = new TypeRacer({
      timeRemaining,
      characters,
      userInput,
      accuracy,
      wpm,
    });
  
    // Save the TypeRacer document to the database
    typeRacerData.save()
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error('Error saving TypeRacer data:', error);
        res.status(500).json({ error: 'An error occurred while saving TypeRacer data' });
      });
  };
  

  module.exports = {
    getTypeRacerData
  }