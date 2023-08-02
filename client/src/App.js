import React from 'react';
import TypingGameComponent from './components/TypingGameComponent';
import InputSentenceComponent from './components/InputSentenceComponent';
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Hack Racer</h1>
      <div  className='input-sentence-component'> 
        <h2>Create custom sentences! </h2>
        <InputSentenceComponent/>
      </div>
      
      <div className='game-component'>  
        <h2>Play!</h2>
        <TypingGameComponent/>
      </div>
    </div>
  );
}

export default App;



