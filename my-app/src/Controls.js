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
        <p>Start: Highlights words that begin with specified character</p>
        <p>End: Highlights words that end with specified character</p>
        <p>Length: Highlights words that have specified amount of characters</p>
        <p>Has: Highlights words that have specified character somewhere</p>
        <p>Lacks: Highlights words that do not have specified character anywhere</p>
        <p>If the targeted word is one of the highlighted words, when * is passed it will remove all non-highlighted words. If the targeted word is not one of the highlighted words, nothing happens.</p>
        <button onClick={onReturnToTitle}>Return to Title</button>
      </div>
    );
  };
export default Controls;
