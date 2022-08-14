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
  const textInput = useRef(null)

console.log(status, "App 1");

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
      <Timer status={status} setStatus= {setStatus} />
      <div className="input-container">
        <input
        ref={textInput}
          type="text"
          className="input"
          onKeyDown={handleKeyDown}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          disabled={status !== "started"}
        />
      </div>
      { (status === "pending" || status === "finished") && <div className="button-container">
        <button className="start-button" onClick={()=>setStatus("started")} >Start</button>
      </div>}
      {/* (
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
      ) */}


{/* //NEEDS ADJUSTMENT 1 */}

{ status === "started" && 
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
        </div> }
      

{/* //ENDING */}

      {/* {status === "finished" && (
        <div className="section">
          <div className="columns">
            <div className="column">
              <p>Score:</p>
              <p>{correctWords}</p>
            </div>
            <div className="column">
              <div>Accuracy: </div>
              <p>
                {Math.round(
                  (correctWords / (correctWords + inCorrectWords)) * 100
                )}
                %
              </p>
            </div>
          </div>
        </div>
      )} */}
   
   {/* //NEEDS ADJUSTMENT 2*/}
    
       { status === "finished" &&  <div className="section">
          <div className="columns">
            <div className="column">
              <p>Score:</p>
              <p>{correctWords}</p>
            </div>
            <div className="column">
              <div>Accuracy: </div>
              <p>
                {Math.round(
                  (correctWords / (correctWords + inCorrectWords)) * 100
                )}
                %
              </p>
            </div>
          </div>
        </div>}
      

      {/* //ENDING */}
    </div>
  );
}

export default App;
