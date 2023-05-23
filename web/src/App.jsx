import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBarCaterogies from './components/Sidebar/Sidebar';
  
function App() {
  return (
    <Router>
      <SideBarCaterogies />
    </Router>
  );
}
  
export default App;