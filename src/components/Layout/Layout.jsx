import React from 'react';
import Header from './Header/Header';

import { Switch, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Authenticated from '../Authenticated/Authenticated';

import Dashboard from '../Dashboard/Dashboard';
import AddSong from '../AddSong/AddSong';
import SongList from '../SongList/SongList';

/**
 * Handles the layout for the react-router.
 * 
 * Created on 2019-09-08
 * 
 * Author: Stefan Ulrich
 * Version 1.0
 */
class Layout extends React.Component {

    // Decides what the user see's on page.
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Authenticated>
                        <Header />
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/addSong' component={AddSong} />
                        <Route path='/songList' component={SongList} />
                    </Authenticated>
                </Switch>
            </div>
        )
    }
}

export default Layout;