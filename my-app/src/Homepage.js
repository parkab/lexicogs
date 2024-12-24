import React from 'react';
import './HomePage.css';
const HomePage = ({ onStart, onShowControls }) => {
  return (
    <div className="HomePage">
      <h1>Welcome to Lexicogs!</h1>
      <p>In this game, you're tasked with finding a word out of hundreds of words bouncing around the screen.
        You'll be able to use various random filters to help you find the word you're looking for (some more helpful than others)
        and your goal is to find as many words as you can before the time runs out. Start with reading the help page, and good luck!
      </p>
      <button onClick={onStart}>Play</button>
      <button onClick={onShowControls}>Help and Controls</button>
      <p>Creators: Parth Kabaria, Luke Shen, and Yash Parlikar</p>
    </div>
  );
};

export default HomePage;