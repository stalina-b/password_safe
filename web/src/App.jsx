import jpg from "./assets/render.jpg";

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/authflow/Login";
import Register from "./components/authflow/Register";
import {Dashboard} from "./components/dashboard/Dashboard.jsx";
import {Adminboard} from "./components/adminboard/Adminboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/" element={<Dashboard />} />
                <Route path="/adminboard/" element={<Adminboard/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;