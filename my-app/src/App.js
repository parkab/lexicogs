import React, { useState } from 'react';
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
