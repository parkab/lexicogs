import React from 'react';

const HomePage = ({ onStart }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to Dr. OctoSplunker!</h1>
      <p>
        In this game, you will be given different filters to locate words on the screen.
        Use the filters to find words based on their starting letters, ending letters, or length.
      </p>
      <button onClick={onStart} style={{ fontSize: '20px', padding: '10px 20px' }}>
        Play
      </button>
    </div>
  );
};

export default HomePage;