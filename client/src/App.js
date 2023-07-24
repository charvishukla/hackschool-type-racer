import React, { useEffect, useState } from "react";
import useTypingGame, { CharStateType, PhaseType } from "react-typing-game-hook";

const TypingGameDemo = () => {
  const [game, setGame] = useState(null);
  const [gameText, setGameText] = useState(""); // Initialize gameText with an empty string

  const {
    states: {
      charsState,
      length,
      currIndex,
      currChar,
      correctChar,
      errorChar,
      phase,
      startTime,
      endTime,
    },
    actions: { insertTyping, resetTyping, deleteTyping },
  } = useTypingGame(gameText); // Pass gameText to the useTypingGame hook

  useEffect(() => {
    fetch("http://localhost:5000/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((newGame) => {
        console.log("Response data:", newGame);
        setGame(newGame);
        setGameText(newGame.text); // Update gameText with the game text
      })
      .catch(err => console.error("Fetch Error: ", err));
  }, []);

  useEffect(() => {
    if (game && game._id && currIndex === length - 1) {
      const updatedGame = {
        ...game,
        length,
        currIndex,
        currChar,
        correctChar,
        errorChar,
        phase,
        startTime,
        endTime,
      };
      fetch(`http://localhost:5000/api/game/${game._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGame),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err)).catch(err => {
          console.error("Fetch Error: ", err); // Log the error
        });
    }
  }, [game, length, currIndex, currChar, correctChar, errorChar, phase, startTime, endTime]);
  const handleKey = (key) => {
    if (key === "Escape") {
      resetTyping();
      return;
    }
    if (key === "Backspace") {
      deleteTyping(false);
      return;
    }
    if (key.length === 1) {
      insertTyping(key);
    }
  };

  return (
    <div>
      <h1>Hack School Fall 2023!!! </h1>
      <p>Click on the text below and start typing (or hit esc to reset)</p>
      <p>dont judge my frontend</p>
      <p>alsooo, there's only one sentence, I didnt have time to set up faker lol</p>
      <div
        className="typing-test"
        onKeyDown={(e) => {
          handleKey(e.key);
          e.preventDefault();
        }}
        tabIndex={0}
      >
        {gameText && gameText.split("").map((char, index) => {
          let state = charsState[index];
          let color =
            state === CharStateType.Incomplete
              ? "black"
              : state === CharStateType.Correct
              ? "green"
              : "red";
          return (
            <span
              key={char + index}
              style={{ color }}
              className={currIndex + 1 === index ? "curr-letter" : ""}
            >
              {char}
            </span>
          );
        })}
      </div>
      <pre>
        {JSON.stringify(
          {
            startTime,
            endTime,
            length,
            currIndex,
            currChar,
            correctChar,
            errorChar,
            phase: PhaseType[phase],
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default TypingGameDemo;