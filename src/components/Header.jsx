import React from 'react';
import { NavLink, Link} from 'react-router-dom';
import { SiThemoviedatabase } from "react-icons/si";

const Header = () => {
    const activeStyle = { color: 'pink' }
    return (
        <header className='header'>
            <h1 className='logo'><Link to="/"><SiThemoviedatabase /></Link></h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" style={({ isActive }) => (isActive ? activeStyle : undefined)}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Drama" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Drama</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;