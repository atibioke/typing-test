import React, { useState, useEffect, useRef } from "react";
import Timer from "./Helper/Timer";
import WordsContainer from "./Helper/WordsContainer";
import randomWords from "random-words";
import "./main.css";
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
      {status === "pending" && <h3>Set time then click Start to begin</h3>}
      <Timer status={status} setStatus={setStatus} />
      {status === "started" && (
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="content">
                {words.map((word, index) => (
                  <span key={index}>
                    <span>
                      {word.split("").map((letter, idx) => (
                        <span key={idx}>{letter}</span>
                      ))}
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
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
      {(status === "pending" || status === "finished") && (
        <div className="button-container">
          <button className="start-button" onClick={() => setStatus("started")}>
            Start
          </button>
        </div>
      )}

   

      {status === "finished" && (
        <div className="section score-container">
          <div className="columns">
            <div className="column">
              <p>Score:</p>
              <p>{correctWords}</p>
            </div>
            <div className="column">
              <div>Accuracy: </div>
              <p>
                {isNaN(correctWords/(correctWords + inCorrectWords)) ? '0' : Math.round(
                  (correctWords / (correctWords + inCorrectWords)) * 100
                )}
                %
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
