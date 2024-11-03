import React, { useEffect, useState } from 'react';
import HomePage from './Homepage.js' ;
import './App.css';
import words from './data/words.json';
import filters from './Filter/Filters.js';

function App() {
  //game state
  const [isPlaying, setIsPlaying] = useState(false) ;
  const [gameOver, setGameOver] = useState(false) ;

  //user inputs
  const [searchInput, setSearchInput] = useState('');
  const [lastEntered, setLastEntered] = useState('');
  
  //filters
  const [currentFilter, setCurrentFilter] = useState(null);
  const [circleFilters, setCircleFilters] = useState([]);
  
  //timer
  const [timeLeft, setTimeLeft] = useState(60);

  //filter setup
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


  //countdown timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setGameOver(true) ;
          setIsPlaying(false) ;
          clearInterval(timer) ;
          return 0 ;
        }
        return prevTime - 1 ;
      }) ;
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);


  //word movement
  const wordList = words;

  //initial positions
  const [positions, setPositions] = useState(
    wordList.map(() => ({
      top: Math.random() * 80 + '%', 
      left: Math.random() * 80 + '%',
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: (Math.random() - 0.5) * 2, 
    }))

  ); //END SET STARTING POSITION OF WORDS


  const [speed, setSpeed] = useState(2);   //Speed
  const FilteredWords = ["loupe", 'clank'];


 // CTRL keydown to toggle speed
 useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === 'Control' || event.code === 'ControlLeft') {
      setSpeed((prevSpeed) => (prevSpeed === 2 ? 0.3 : 2));
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, []); //END SPEED CONTROL

  //MOVING WORDS
  useEffect(() => {
    const updatePositions = () => {
      setPositions((prevPositions) =>
        prevPositions.map((pos) => {
          let newX = parseFloat(pos.left) + pos.velocityX * speed;
          let newY = parseFloat(pos.top) + pos.velocityY * speed;

          if (newX > 95 || newX < 0) {
            pos.velocityX *= -1; 
          }
          if (newY > 95 || newY < 0) {
            pos.velocityY *= -1; 
          }

          return {
            ...pos,
            left: `${newX}%`,
            top: `${newY}%`,
          };
        })
      );
    };

    const interval = setInterval(updatePositions, 1000 / 60);

    return () => {
      clearInterval(interval);
    };

  }, [speed]); // END MOVING WORDS

//function to start the game
  const startGame = () => {
    setIsPlaying(true) ;
    setTimeLeft(60) ;
    setGameOver(false) ;
  } ;

  return (
    <div className="App">
      {isPlaying ? (
        <>
          {/* Game content: visible only when isPlaying is true */}
          <audio controls autoPlay loop>
            <source src={`${process.env.PUBLIC_URL}/unwinding.mp3`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <div className="TopBar">
            <div className="Timer">{timeLeft} seconds</div>
          </div>      

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
        </>
      ) : gameOver ? (
        <div className="GameOverScreen">
          <h1>Game Over</h1>
          <p>Time is up! Dr. OctoSplunker grappled you.</p>
          <button onClick={startGame}>Play Again</button>
        </div>
      ) : (
        // Render only the HomePage when `isPlaying` is false
        <HomePage onStart={startGame} />
      )}
    </div>
  );

}

export default App;
