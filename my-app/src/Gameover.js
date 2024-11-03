// GameOver.js
import React from 'react';
import './HomePage.css';
const GameOver = ({ onRestart, onReturnToTitle, score }) => {
  return (
    <div className="GameOverScreen">
      <h1>Game Over</h1>
      <p>Time is up! The Lexicogs ran out of steam.</p>
      <p>Your score: {score}</p>
      <button onClick={onRestart}>Play Again</button>
      <button onClick={onReturnToTitle}>Return to Title</button>
    </div>
  );
};

export default GameOver;