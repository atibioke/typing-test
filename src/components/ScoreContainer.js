import React from "react";

const ScoreContainer = (props) => {
  const { correctWords, inCorrectWords, setStatus } = props;
  return (
    <div className="section score-container">
      <div className="retry-button-container">
        <button
          className="start-button retry-btn"
          onClick={() => setStatus("pending")}
        >
          Retry
        </button>
      </div>
      <div className="columns">
        <div className="column">
          <p>Score:</p>
          <p>{correctWords}/250</p>
        </div>
        <div className="column">
          <div>Accuracy: </div>
          <p>
            {isNaN(correctWords / (correctWords + inCorrectWords))
              ? "0"
              : Math.round(
                  (correctWords / (correctWords + inCorrectWords)) * 100
                )}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreContainer;
