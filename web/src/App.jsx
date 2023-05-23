import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  
function App() {
  return (
    <Router>
      <Sidebar />
    </Router>
  );
}
  
export default App;