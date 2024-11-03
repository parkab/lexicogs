import React, { useEffect, useState } from 'react';
import HomePage from './Homepage.js' ;
import Controls from './Controls.js' ;
import GameOver from './Gameover.js' ;
import './App.css';
import words from './data/words.json';
import filters from './Filter/Filters.js';

function App() {
  //game state
  const [isPlaying, setIsPlaying] = useState(false) ;
  const [gameOver, setGameOver] = useState(false) ;
  const [showControls, setShowControls] = useState(false) ;

  //user inputs
  const [searchInput, setSearchInput] = useState('');
  const [lastEntered, setLastEntered] = useState('');
  
  //filters
  const [currentFilter, setCurrentFilter] = useState(null);
  const [circleFilters, setCircleFilters] = useState([]);
  const [FilteredWords, setFilteredWords] = useState([]);
  const [chosenWord, setChosenWord] = useState('');
  const [wordList, setCurWordList] = useState(words);
  const [filterCount, setFilterCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  //filter setup
  useEffect(() => {
    const initialFilters = getRandomFilters(4);
    setCurrentFilter(initialFilters[0]);
    setCircleFilters(initialFilters.slice(1));
    //console.log('Initial Filters:', initialFilters);

    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setChosenWord(randomWord);
  }, []);

  const getRandomFilters = (count) => {
    // const shuffledFilters = filters.sort(() => 0.5 - Math.random());
    // const selectedFilters = shuffledFilters.slice(0, count);

    // for (let i = 0; i < selectedFilters.length; i++) {
    //   if ((filterCount + i + 1) % 4 === 0) {
    //     selectedFilters[i] = { label: '*', apply: () => [] };
    //   }
    // }

    // return selectedFilters;
    const shuffledFilters = filters.sort(() => 0.5 - Math.random());
    const tempFilters = shuffledFilters.slice(0, count);
    const selectedFilters = [];

    for (let i = 0; i < count; i++) {
      if ((filterCount + i + 1) % 4 === 0) {
        selectedFilters.push({ label: '*', apply: () => [] });
      } else {
        selectedFilters.push(tempFilters.pop());
      }
    }

    setFilterCount(filterCount + count);
    return selectedFilters;
  };

  const handleInputChange = (event) => {
    if (currentFilter?.label === '*') {
      setSearchInput('Filter!');
    } else {
      setSearchInput(event.target.value);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLastEntered(searchInput);

    // if (currentFilter) {
    //   const filtered = currentFilter.apply(words, searchInput);
    //   setFilteredWords(filtered);
    // }

    if (searchInput === 'Filter!') {
      if (FilteredWords.includes(chosenWord)) {
        setCurWordList(FilteredWords);
        //wordList = FilteredWords;
      }
      setFilteredWords([]);
    } else if (currentFilter) {
      const filtered = currentFilter.apply(wordList, searchInput);
      setFilteredWords((prevFilteredWords) => [
        ...new Set([...prevFilteredWords, ...filtered]),
      ]);
      //setCurWordList(filtered); //IMPORTANT LINE
    }

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
  const [watchTime, setWatchTime] = useState(10); 
  const [isWatchActive, setIsWatchActive] = useState(false);
  //const FilteredWords = ["loupe", 'clank'];

 // CTRL keydown to toggle speed
 useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === 'Control' || event.code === 'ControlLeft') {
      if (watchTime > 0) {
        setSpeed((prevSpeed) => {
          const newSpeed = prevSpeed === 2 ? 0.3 : 2;
          setIsWatchActive(newSpeed === 0.3);
          return newSpeed;
        });
      } else if (speed === 0.3) {
        setSpeed(2);
        setIsWatchActive(false);
      }
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [watchTime]); //END SPEED CONTROL

// Watch timer countdown
useEffect(() => {
  let timer;
  if (isWatchActive && watchTime > 0) {
    timer = setInterval(() => {
      setWatchTime((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          // When time runs out, force speed back to normal
          setSpeed(2);
          setIsWatchActive(false);
          return 0;
        }
        return newTime;
      });
    }, 1000);
  }
  return () => clearInterval(timer);
}, [isWatchActive]);

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

    setCurWordList(words);
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setChosenWord(randomWord);

    setTimeLeft(10) ;
    setGameOver(false) ;
    setWatchTime(10); 
    setSpeed(2);
    setIsWatchActive(false);
  } ;

//function to return to title
  const returnToTitle = () => {
    setIsPlaying(false);
    setShowControls(false);  
    setGameOver(false);   
  };  

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
            <div className="WatchContainer">
              <button className="Watch"></button>
              <div className="WatchTimer">{watchTime}s</div>
            </div>
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
            Last Entered: {lastEntered} || Chosen Word: {chosenWord}
          </div>
        </>
      ) : gameOver ? (
        <GameOver onRestart ={startGame} onReturnToTitle={returnToTitle} />
      ) : showControls ? (
        <Controls onReturnToTitle={returnToTitle} />
      ) : (
        <HomePage 
          onStart={startGame}
          onShowControls = {() => setShowControls(true)}
        />
      )}
    </div>
  );

}

export default App;
