// import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Login  from "./components/authflow/Login";
import Register from "./components/authflow/Register.jsx";
import Dashboard from "./pages/Dashboard"

  
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    </BrowserRouter>

  );
}
  
export default App;