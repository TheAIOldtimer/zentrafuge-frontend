import React from 'react';
import './App.css';
import Chat from './pages/Chat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ZENTRAFUGE</h1>
        <h2>AI Mental Health Companion</h2>
      </header>
      
      <main className="App-main">
        <Chat />
      </main>
    </div>
  );
}

export default App;
