import React from 'react';
import './App.css';

import Footer from './components/Footer.js';
import Chat from './pages/Chat.js';
import Recipe from './pages/Recipe.js';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Navigate replace to='/chat'/>}/>
          <Route path='/chat' element={<Chat />}/>
          <Route path='/recipe/:name' element={<Recipe />}/>
          <Route path='*' element={<Navigate replace to='/chat'/>}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
