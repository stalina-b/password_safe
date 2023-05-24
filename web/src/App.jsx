import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarCategories from './components/Sidebar/Sidebar';
  
function App() {
  return (
    <Router>
      <SidebarCategories />
    </Router>
  );
}
  
export default App;