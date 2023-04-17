import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
const Hader = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/registerRBS">registerRBS</Link>
        </nav>
    );
};

export default Hader;