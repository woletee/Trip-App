// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/generate">Generate ARC Task</Link>
                </li>
                <li>
                    <Link to="/download">Download Generated ARC Task</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
