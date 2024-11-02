import React from 'react';
import './App.css';

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
  return (
    <div className="App">
      <div className="MainContent">
        {}
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
