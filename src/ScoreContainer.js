import React from "react";

const ScoreContainer = (props) => {
  const { correctWords, inCorrectWords } = props;
  return (
    <div className="section score-container">
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
