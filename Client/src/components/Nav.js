import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {

    return (
        <nav>
            <ul>
                <NavLink exact activeClassName = "Home" to = "/" replace><li>Home</li></NavLink> 
                <NavLink exact activeClassName = "About" to = "/about" replace><li>About</li></NavLink> 
            </ul>
        </nav>
    );
}

export default Nav