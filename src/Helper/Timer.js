import React, { useState, useEffect } from "react";

function Timer({ status, setStatus }) {
  //Timers Start
  const [initialTime, setInitalTime] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");

  useEffect(() => {
    if (+initialTime && status === "started") {
      let myInterval = setInterval(() => {
        
        if (minutes >= 0 ) {
          if(minutes === 0 && seconds === 0) {
            setSeconds("0")
            setInitalTime("0")
            
          }else {
            setSeconds(59)
          }
     
      }
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            setStatus("finished");
           setInitalTime("0")
            return clearInterval(myInterval);
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  useEffect(() => {
    if (+initialTime && status === "started") {
     setMinutes(initialTime - 1);
    }
  }, [status, initialTime]);
  //minutes ENDS

  return (
    <div className="minutes">
      <input
        value={initialTime}
        className="minutes-input"
        placeholder="Input min"
        onChange={(e) => {
          setInitalTime(e.target.value);
        }}
        disabled={status === "started"}
      ></input>

      {minutes === 0 && seconds === 0 ? null : (
        <h1>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
}

export default Timer;
