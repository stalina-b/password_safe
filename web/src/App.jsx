import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidebarCategories from './components/Sidebar/Sidebar';
import Searchbar from './components/Searchbar/Searchbar';
  
function App() {
  return (
    <Router>
      <SidebarCategories />
      <Searchbar />
    </Router>
  );
}
  
export default App;