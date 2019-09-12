import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

class Navigation extends React.Component {

    render() {
        return (
            <nav>
                <ul>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/addSong'>Add Song</Link></li>
                    <li style={{ 'float': 'right' }}><Link to='/login'>Logout</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Navigation;