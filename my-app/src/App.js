import React, { useEffect, useState } from 'react';
import './App.css';
import words from './data/words.json';

function App() {

  const [searchInput, setSearchInput] = useState('');
  const [lastEntered, setLastEntered] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLastEntered(searchInput);
    setSearchInput('');
  };

  const wordList = words;
  //START
  const [positions, setPositions] = useState(
    wordList.map(() => ({
      top: Math.random() * 80 + '%', 
      left: Math.random() * 80 + '%',
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: (Math.random() - 0.5) * 2, 
    }))
  ); //END

  const [speed, setSpeed] = useState(.5);   //Speed
  const [selectedWordIndex, setSelectedWordIndex] = useState([]); //Selected Words

  //START
  useEffect(() => {
    const updatePositions = () => {
      setPositions((prevPositions) =>
        prevPositions.map((pos) => {
          let newX = parseFloat(pos.left) + pos.velocityX * speed;
          let newY = parseFloat(pos.top) + pos.velocityY * speed;

          if (newX > 95 || newX < 0) {
            pos.velocityX *= -1; 
            //console.log(`Reversed X velocity for position: ${pos.left}, ${pos.top}`);
          }
          if (newY > 95 || newY < 0) {
            pos.velocityY *= -1; 
            //console.log(`Reversed Y velocity for position: ${pos.left}, ${pos.top}`);
          }

          return {
            ...pos,
            left: `${newX}%`,
            top: `${newY}%`,
          };
        })
      );
      //console.log("Updated positions:", positions);
    };

    const interval = setInterval(updatePositions, 1000 / 60);

    return () => {
      clearInterval(interval);
      //console.log("Interval cleared");
    };
  }, []); // END

  return (
    <div className="App">
      <audio controls autoPlay loop>
        <source src={`${process.env.PUBLIC_URL}/unwinding.mp3`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="MainContent">
        {positions.map((pos, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              transition: 'top 0.1s linear, left 0.1s linear', ////
              cursor: 'pointer', // REMOVE
              color: selectedWordIndex === index ? 'cyan' : 'white',
              opacity: selectedWordIndex === index ? '1' : '0.6', 
            }}
            onClick={() => setSelectedWordIndex(index)} //REMOVE
          >
            {wordList[index]} {}
          </div>
        ))}
      </div>
      
      <div className="BottomBar">
      <div className="Circle SavedItem">Saved</div>
        <button className="Circle Stopwatch">Stopwatch</button>
        <form onSubmit={handleFormSubmit} className="SearchForm">
          <input
            type="text"
            className="SearchBar"
            placeholder="Search..."
            value={searchInput}
            onChange={handleInputChange}
          />
        </form>
        <div className="Circle LargeCircle">3</div>
        <div className="Circle MediumCircle">2</div>
        <div className="Circle SmallCircle">1</div>
      </div>
      <div className="LastEntered">
        Last Entered: {lastEntered}
      </div>
    </div>
  );
}

export default App;
