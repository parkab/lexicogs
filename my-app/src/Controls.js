import React from 'react';
import './HomePage.css';
const Controls = ({ onReturnToTitle }) => {
    return (
      <div className="ControlsScreen">
        <h1>Game Controls</h1>
        <p>Ctrl: Slows down time</p>
        <p>Keyboard: Inputs for filters</p>
        <p>Enter: Applies your filter</p>
        <h1>Types of Filters</h1>
        <p>Start: Begins with specified character</p>
        <p>End: Ends with specified character</p>
        <p>Length: Has specified amount of characters</p>
        <p>Has: Has specified character somewhere</p>
        <p>Lacks: Does not have specified character anywhere</p>
        <button onClick={onReturnToTitle}>Return to Title</button>
      </div>
    );
  };
export default Controls;
