import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

/**
 * Show the Navigation on top of the page.
 * 
 * Created on 2019-09-08
 * 
 * Author: Stefan Ulrich
 * Version 1.0
 */
class Navigation extends React.Component {

    // Shows the navigation on top of the page.    
    render() {
        return (
            <nav>
                <ul>
                    <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                    <li><NavLink to='/addSong'>Add Song</NavLink></li>
                    <li><NavLink to='/songList'>Song List</NavLink></li>
                    <li style={{ 'float': 'right' }}><NavLink to='/login'>Logout</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default Navigation;