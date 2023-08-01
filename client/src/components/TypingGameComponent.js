
/**
 * useEffect : (i) lets you synchronize a component with an external system (lmao)
 *             (ii) we will be using it to check game completion conditions
 * useCallback : (i) prevents component from re-rendering unless props have changed
 *              (ii) used to calculate score
 */
import React, { useEffect, useCallback } from "react";
import useTypingGame, {PhaseType} from "react-typing-game-hook"; // for playing the game
import axios from "axios"; // to make HTTP requests to the backend
console.log("Mounting Typing Game component...");
const TypingGameComponent = () => {

  // useTypingGame to keep track of, and modify chars being typed and other stuff
  let text = "As he looked out the window, he saw a clown walk by.";
  const {
    states: { chars, charsState, phase},
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(text , { // i copied this object from the docs so idk what tgat is o
    skipCurrentWordOnSpace: true,
    pauseOnError: false,
    countErrors: "everytime",
  });

  // Axios for communicating with the backend (i.e. sending game stats)
  // Endpoint: 'http://localhost:5000/api/game'
  const sendGameStats = async (stats) => {
    try {
      console.log("sending game stats to the backend");
      // Make a POST request to create/update the game stats document
      await axios.post("http://localhost:5000/api/game", stats);
      console.log("Game stats created/updated:", stats);
    } catch (error) {
      console.error("Failed to create/update game stats:", error);
    }
  };

  // triggered when start button is clicked
  // updates setGameStart
  const handleGameStart = () => {
    console.log("handleGameStart triggered");
    if (phase === PhaseType.NotStarted) {
      console.log(phase)
      resetTyping();
    }
  };

  // state === 1 implies that the character has been typed correctly.
  // basically filter through states for all characters, and count the number of  characters typed in correctly.
  // we use callback to dynamically count
  const calculateScore = useCallback(() => {
    return charsState.filter((state) => state === 1).length; // we can also use state === 2 to calculate #of wrong
  }, [charsState]);

  const calculateWPM = useCallback(() => {
    console.log("calculating words per min...");
    let numWords = text.split(" ").length;
    console.log(numWords);
    return numWords / (getDuration()*0.001)%60;
  }, [getDuration])

  const handleGameEnd = useCallback(() => {
    if (phase === PhaseType.Ended) {
      console.log(getDuration());
      sendGameStats({ 
        sentence: chars, 
        correctChars: calculateScore(), 
        wpm: calculateWPM(),
        time: (getDuration() * 0.001)%60
      });
    }
  }, [chars, calculateScore, calculateWPM ,getDuration, phase]);

  /**
   * Checking for game completion conditions:
   * Complete iff:
   *        - Currently, gameStarted  === true
   *        - on the n+1th character
   */
  useEffect(() => {
    if (phase === PhaseType.Started && charsState.length === chars.length + 1) {
      handleGameEnd();
    }
  }, [phase, chars.length, handleGameEnd, charsState.length]);

  // here, we render the game
  return (
    <div>
      {!PhaseType.Started? (
        <button onClick={handleGameStart}>Start</button> // call handleGameStart when Start is clicked
      ) : (
        <h1
          onKeyDown={(e) => {
            // call different functions based on the key clicked
            const key = e.key;
            if (key === "Escape") {
              // we can potentially change it from escape char to a button lmk tho
              resetTyping();
            } else if (key === "Backspace") {
              deleteTyping(false);
            } else if (key.length === 1) {
              insertTyping(key);
            }
            // preventDefault makes sure that the keys dont do what they normally do, and instead
            // execute the functions that we have specified above
            e.preventDefault();
          }}
          tabIndex={0}
          onBlur={handleGameEnd} // when the user clicks away from the component (which is in <h1> rn)
        >
          {chars.split("").map((char, index) => {
            let state = charsState[index]; // check state at curr pos
            // if not done -> black
            // if correct -> green
            // else red
            // **lmk if it wud be better to do a regular if statement instead... this is just short **
            let color = state === 0 ? "black" : state === 1 ? "green" : "red";
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

// exporting the typing game component here
export default TypingGameComponent;

// wooooo
