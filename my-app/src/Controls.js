import React from 'react';
import './Controls.css';
import './HomePage.css';

const Controls = ({ onReturnToTitle }) => {
    return (
      <div className="ControlsScreen">
        <div className="controls-content">
          <div className="left-section">

            <h1>How This Game Works</h1>
            <p>The bar at the top of the screen shows your current score, your timer, and hints for the target word. Every round, a new target word and new words to bounce across the screen are randomly generated.</p>
            <p>After typing into the search bar, you can apply the current filter on the remaining words. Words that match the filter will become highlighted blue.</p>
            <p>You'll have multiple selection filters to apply before you can actually filter. All of these filters stack! For example, applying 'start' with 'a' and then 'end' with 'r' would highlight both 'apple' and 'pear'.</p>

            <h1>The Search Bar</h1>
            <p>Type in a single letter (a single number for the 'length' filter) when dealing with filters.</p>
            <p>When * is next, press enter to filter on the current selection.</p>
            <p>If the target word is one of the highlighted words, * will remove all non-highlighted words. If the targeted word is not one of the highlighted words, nothing happens.</p>
            <p>Enter the target word at any point if you think you found it! If right, a new round will begin.</p>

            <h1>Difficulty Ramping</h1>
            <p>As you guess more words correctly, the words will start moving across the screen faster and faster.</p>
            <p>The time added per correct guess starts at 60 seconds, but decreases by 5 seconds every correct guess until a minimum of 30 seconds is added per correct guess.</p>
            <p>Tip: Build up your game timer as much as possible early game so you can get a higher score!</p>
          </div>

          <div className="right-section">

            <h1>Game Controls</h1>
            <p>Keyboard: Inputs for filters, pressing enter applies your filter.</p>
            <p>Ctrl: Toggles the stopwatch, the remaining time on this powerup can be seen below the stopwatch in the bottom left.</p>
            <p>Stopwatch: Slows down the moving words and pauses the game timer when toggled. Regenerates at 0.2s per second, caps at 20 seconds.</p>
            <p>Hints: A new letter of the word is revealed every 10 seconds, starting with the second to last and second letters and lastly the last and first letters. The middle letters are never revealed!</p>

            <h1>Types of Filters</h1>
            <p>Start: Highlights words that begin with specified character</p>
            <p>End: Highlights words that end with specified character</p>
            <p>Length: Highlights words that have specified amount of characters</p>
            <p>Has: Highlights words that have specified character somewhere</p>
            <p>Lacks: Highlights words that do not have specified character anywhere</p>
          </div>
        </div>

        <div className="button-container">
          <button onClick={onReturnToTitle}>Return to Title Screen</button>
        </div>

      </div>
    );
  };
export default Controls;
