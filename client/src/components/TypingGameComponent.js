import React, { useState, useEffect, useCallback } from 'react'; // react duh
import useTypingGame from 'react-typing-game-hook'; // for playing the game! 
import axios from 'axios'; // to make HTTP requests to the backend! 

const TypingGameComponent = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const {
    states: { chars, charsState },
    actions: { insertTyping, resetTyping, deleteTyping },
  } = useTypingGame('Click the Start button to begin typing!');

  const sendGameStats = async (stats) => {
    try {
      // Make a POST request to create/update the game stats document
      await axios.post('http://localhost:5000/api/game', stats);
      console.log('Game stats created/updated:', stats);
    } catch (error) {
      console.error('Failed to create/update game stats:', error);
    }
  };

  const handleGameStart = () => {
    setGameStarted(true);
    resetTyping();
  };

  const calculateScore = useCallback(() => {
    return charsState.filter((state) => state === 1).length;
  }, [charsState]);

  const handleGameEnd = useCallback(() => {
    setGameStarted(false);
    sendGameStats({ sentence: chars, score: calculateScore() });
  }, [chars, calculateScore]);


  useEffect(() => {
    if (gameStarted && chars.length > 0 && charsState.length === chars.length + 1) {
      handleGameEnd();
    }
  }, [chars.length, gameStarted, handleGameEnd, charsState.length]);
  
  return (
    <div>
      {!gameStarted ? (
        <button onClick={handleGameStart}>Start</button>
      ) : (
        <h1
          onKeyDown={(e) => {
            const key = e.key;
            if (key === 'Escape') {
              resetTyping();
            } else if (key === 'Backspace') {
              deleteTyping(false);
            } else if (key.length === 1) {
              insertTyping(key);
            }
            e.preventDefault();
          }}
          tabIndex={0}
          onBlur={handleGameEnd}
        >
          {chars.split('').map((char, index) => {
            let state = charsState[index];
            let color = state === 0 ? 'black' : state === 1 ? 'green' : 'red';
            return (
              <span key={char + index} style={{ color }}>
                {char}
              </span>
            );
          })}
        </h1>
      )}
    </div>
  );
};







// exporting the typing game component:
export default TypingGameComponent;