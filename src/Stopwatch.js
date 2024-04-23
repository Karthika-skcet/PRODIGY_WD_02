import React, { useState, useEffect } from 'react';
import './Stopwatch.css'; // Import the CSS file for styling

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const startStopwatch = () => {
    setIsRunning(true);
    setStartTime(Date.now() - elapsedTime);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch</h1>
      <p>{formatTime(elapsedTime)}</p>
      <button onClick={isRunning ? stopStopwatch : startStopwatch}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={resetStopwatch}>Reset</button>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60000);
  const seconds = ((time % 60000) / 1000).toFixed(2);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
};

export default Stopwatch;
