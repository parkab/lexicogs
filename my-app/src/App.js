import React, { useEffect, useState } from 'react';
import './App.css';
import words from './data/words.json';
import filters from './Filter/Filters.js';
import HomePage from './Homepage.js';

function App() {
  const [isPlaying, setIsPlaying] = useState(false) ;
  const [searchInput, setSearchInput] = useState('');
  const [lastEntered, setLastEntered] = useState('');
  const [currentFilter, setCurrentFilter] = useState(null);
  const [circleFilters, setCircleFilters] = useState([]);
  const [FilteredWords, setFilteredWords] = useState([]);
  const [chosenWord, setChosenWord] = useState('');
  const [wordList, setCurWordList] = useState(words);
  const [filterCount, setFilterCount] = useState(0);

  //const wordList = words;

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
  //const FilteredWords = ["loupe", 'clank']; //

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
            //disabled={currentFilter?.label === '*'}
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
    </div>
  );
}

export default App;
