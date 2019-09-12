import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

class Navigation extends React.Component {

    render() {
        return (
            <nav>
                <ul>
                    <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                    <li><NavLink to='/addSong'>Add Song</NavLink></li>
                    <li style={{ 'float': 'right' }}><NavLink to='/login'>Logout</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default Navigation;