import React from "react";
import useTypingGame, {
  CharStateType,
  PhaseType
} from "react-typing-game-hook";
import "./styles.css";

const TypingGameDemo = () => {
  let text = "The quick brown fox jumps over the lazy dog";
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
      endTime
    },
    actions: { insertTyping, resetTyping, deleteTyping }
  } = useTypingGame(text);

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
      <h1>React Typing Game Hook Demo</h1>
      <p>Click on the text below and start typing (esc to reset)</p>
      <div
        className="typing-test"
        onKeyDown={(e) => {
          handleKey(e.key);
          e.preventDefault();
        }}
        tabIndex={0}
      >
        {text.split("").map((char, index) => {
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
            phase: PhaseType[phase]
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default TypingGameDemo;
