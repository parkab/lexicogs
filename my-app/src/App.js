import React, { useEffect, useState } from 'react';
import './App.css';
import words from './data/words.json';

function App() {
  const wordList = words;
  // Initialize positions and velocities START
  const [positions, setPositions] = useState(
    wordList.map(() => ({
      top: Math.random() * 80 + '%', // Random top position
      left: Math.random() * 80 + '%', // Random left position
      velocityX: (Math.random() - 0.5) * 2, // Random horizontal velocity
      velocityY: (Math.random() - 0.5) * 2, // Random vertical velocity
    }))
  ); //END

  // Update positions every frame START
  useEffect(() => {
    const updatePositions = () => {
      setPositions((prevPositions) =>
        prevPositions.map((pos) => {
          let newX = parseFloat(pos.left) + pos.velocityX;
          let newY = parseFloat(pos.top) + pos.velocityY;

          // Bounce off the edges
          if (newX > 90 || newX < 0) {
            pos.velocityX *= -1; // Reverse direction
            console.log(`Reversed X velocity for position: ${pos.left}, ${pos.top}`);
          }
          if (newY > 90 || newY < 0) {
            pos.velocityY *= -1; // Reverse direction
            console.log(`Reversed Y velocity for position: ${pos.left}, ${pos.top}`);
          }

          return {
            ...pos,
            left: `${newX}%`,
            top: `${newY}%`,
          };
        })
      );
      console.log("Updated positions:", positions); // Log updated positions
    };

    const interval = setInterval(updatePositions, 1000 / 60); // 60 FPS

    // Cleanup function to clear the interval
    return () => {
      clearInterval(interval);
      console.log("Interval cleared");
    };
  }, []); // END

  return (
    <div className="App">
      <audio controls autoPlay loop>
        <source src={`${process.env.PUBLIC_URL}/unwinding.mp3`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="MainContent">
        {wordList.map((word, index) => (
        <div key={index}>{word}</div> // Display each word
      ))}
      </div>
      <div className="BottomBar">
      <div className="Circle HoldItem">Hold</div>
        <button className="Circle Stopwatch">Stopwatch</button>
        <input type="text" className="SearchBar" placeholder="Search..." />
        <div className="Circle LargeCircle">3</div>
        <div className="Circle MediumCircle">2</div>
        <div className="Circle SmallCircle">1</div>
      </div>
      
    </div>
  );
}

export default App;
