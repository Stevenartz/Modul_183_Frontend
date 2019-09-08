import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../../Login/Login';
import Dashboard from '../../Dashboard/Dashboard';
import Authenticated from '../../Authenticated/Authenticated';
import Header from '../Header/Header';

class Main extends React.Component {

    render() {
        return (
            <div>
                <h3>MAIN</h3>
            </div>
        )
    }
}

export default Main;