// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';  // Import a separate CSS file for Navbar styles

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">ARC Task Generator</div>
            <ul className="nav-links">
                <li>
                    <NavLink exact to="/generate" activeClassName="active" className="nav-item">
                        Generate ARC Task
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/download" activeClassName="active" className="nav-item">
                        Download Generated ARC Task
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
