import React from 'react';
import TypingGameComponent from './components/TypingGameComponent';
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Hack Racer</h1>
      <p>Click on the text below and start typing (or hit esc to reset)</p>
      <TypingGameComponent />
    </div>
  );
}

export default App;



