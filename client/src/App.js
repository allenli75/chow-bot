import React from 'react';
import './App.css';

import Chat from './pages/Chat.js';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Chat />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
