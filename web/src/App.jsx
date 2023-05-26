import jpg from "./assets/render.jpg";

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/authflow/Login";
import Register from "./components/authflow/Register";
import SidebarCategories from "./components/Sidebar/Sidebar";
import Searchbar from "./components/Searchbar/Searchbar";
import Passwords from "./components/PasswordsView/PasswordsView";
import {Dashboard} from "./components/dashboard/Dashboard.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;