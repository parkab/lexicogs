import React from 'react';
import './App.css';
import words from './data/words.json';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload. BBBBBBBBB
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
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
      <div className="Circle HoldItem">Hold</div>
        <button className="Circle Stopwatch">Stopwatch AAAAAAAAAAAAAAAAAAA</button>
        <input type="text" className="SearchBar" placeholder="Search..." />
        <div className="Circle LargeCircle">3</div>
        <div className="Circle MediumCircle">2</div>
        <div className="Circle SmallCircle">1</div>
      </div>
      
    </div>
  );
}

export default App;
