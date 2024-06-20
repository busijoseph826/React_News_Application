// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';
import { NewsProvider } from './components/context/NewsContext';
import './App.css';

const App = () => (
  <NewsProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/business" element={<News />} />
        <Route path="/technology" element={<News />} />
        <Route path="/entertainment" element={<News />} />
      </Routes>
    </Router>
  </NewsProvider>
);

export default App;
