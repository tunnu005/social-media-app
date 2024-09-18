// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from './component/Auth';
import Navbar from './component/Navbar';
import Chat from './pages/Chat';
import Create from './pages/Create';
import Explore from './pages/Explore';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile/:userId/:username" element={<Profile />} />

     
       
      </Routes>
      <Routes>
         
       <Route path="/create" element={<Create />} />
       <Route path="/Explore" element={<Explore />} />
      </Routes>
    </Router>
  );
}

export default App;
