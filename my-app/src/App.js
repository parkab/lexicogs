import React, { useEffect, useState } from 'react';
import HomePage from './Homepage.js' ;
import './App.css';
import words from './data/words.json';
import filters from './Filter/Filters.js';

function App() {
  const [isPlaying, setIsPlaying] = useState(false) ;
  const [searchInput, setSearchInput] = useState('');
  const [lastEntered, setLastEntered] = useState('');
  const [currentFilter, setCurrentFilter] = useState(null);
  const [circleFilters, setCircleFilters] = useState([]);

  useEffect(() => {
    const initialFilters = getRandomFilters(4);
    setCurrentFilter(initialFilters[0]);
    setCircleFilters(initialFilters.slice(0));
    console.log('Initial Filters:', initialFilters);
  }, []);

  const getRandomFilters = (count) => {
    const shuffledFilters = filters.sort(() => 0.5 - Math.random());
    return shuffledFilters.slice(0, count);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLastEntered(searchInput);
    setSearchInput('');

    //shifting the filters along
    setCurrentFilter(circleFilters[0]);
    setCircleFilters((prevFilters) => [
      ...prevFilters.slice(1),
      getRandomFilters(1)[0],
    ]);
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
  const FilteredWords = ["loupe", 'clank'];

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
//function to start the game
  const startGame = () => {
    setIsPlaying(true) ;
  } ;

  return (
    <div className="App">
      <audio controls autoPlay loop>
        <source src={`${process.env.PUBLIC_URL}/unwinding.mp3`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      {isPlaying ? (
        <div className="MainContent">
          {positions.map((pos, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transition: 'top 0.1s linear, left 0.1s linear',
                color: FilteredWords.includes(wordList[index]) ? 'cyan' : 'white',
                opacity: FilteredWords.includes(wordList[index]) ? '1' : '0.6', 
              }}
            >
              {wordList[index]} {}
            </div>
          ))}
        </div>
      ) : (
        <HomePage onStart={startGame} />
      )}
      
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
        <div className="CurrentFilter">{currentFilter?.label}</div>
        <div className="Circle LargeCircle">{circleFilters[0]?.label}</div>
        <div className="Circle MediumCircle">{circleFilters[1]?.label}</div>
        <div className="Circle SmallCircle">{circleFilters[2]?.label}</div>
      </div>
      <div className="LastEntered">
        Last Entered: {lastEntered}
      </div>
    </div>
  );
}

export default App;
