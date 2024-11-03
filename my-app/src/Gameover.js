// GameOver.js
import React from 'react';

const GameOver = ({ onRestart, onReturnToTitle }) => {
  return (
    <div className="GameOverScreen">
      <h1>Game Over</h1>
      <p>Time is up! Dr. OctoSplunker grappled you.</p>
      <button onClick={onRestart}>Play Again</button>
      <button onClick={onReturnToTitle}>Return to Title</button>
    </div>
  );
};

export default GameOver;