import React from 'react'

const WordsContainer = (props) => {
  const { words } = props
  return (
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
  )
}

export default WordsContainer