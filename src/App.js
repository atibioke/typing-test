import React, { useState, useEffect, useRef } from "react";
import Timer from "./Helper/Timer";
import WordsContainer from "./Helper/WordsContainer";
import randomWords from "random-words";
import "./main.css";
import ScoreContainer from "./Helper/ScoreContainer";
const numOfWords = 250;

function App() {
  const [words, setWords] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  const [inCorrectWords, setInCorrectWords] = useState(0);
  const [status, setStatus] = useState("pending");
  const textInput = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, []);

  function generateWords() {
    return new Array(numOfWords).fill(null).map(() => randomWords());
  }

  function handleKeyDown({ keyCode }) {
    if (keyCode === 32) {
      checkMatch();
      setCurrentInput("");
      setCurrentWordIndex(currentWordIndex + 1);
    }
  }

  function checkMatch() {
    const wordToCompare = words[currentWordIndex];
    const matchStatus = wordToCompare === currentInput.trim();
    matchStatus
      ? setCorrectWords(correctWords + 1)
      : setInCorrectWords(inCorrectWords + 1);
    console.log({ matchStatus });
  }

  return (
    <div className="App">
      {(status === "pending" ) && (
        <h3>Set time then click Start to begin</h3>
      )}
      <Timer status={status} setStatus={setStatus} />
      {status === "started" && <WordsContainer words={words} />}
      <div className="input-container">
        <input
          ref={textInput}
          type="text"
          className="input"
          onKeyDown={handleKeyDown}
          placeholder="Type Here"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          disabled={status !== "started"}
        />
      </div>
      {(status === "pending" ) && (
        <div className="button-container">
          <button className="start-button" onClick={() => setStatus("started")}>
            Start
          </button>
        </div>
      )}

      {status === "finished" && (
        <ScoreContainer
          correctWords={correctWords}
          inCorrectWords={inCorrectWords}
          setStatus={setStatus}
        />
      )}
    </div>
  );
}

export default App;
