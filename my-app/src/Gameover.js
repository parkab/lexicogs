// GameOver.js
import React from 'react';

const GameOver = ({ onRestart }) => {
  return (
    <div className="GameOverScreen">
      <h1>Game Over</h1>
      <p>Time is up! Dr. OctoSplunker grappled you.</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default GameOver;