import React from 'react';
import Header from './Header/Header';

import { Switch, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Authenticated from '../Authenticated/Authenticated';

import Dashboard from '../Dashboard/Dashboard';
import AddSong from '../AddSong/AddSong';
import SongList from '../SongList/SongList';

class Layout extends React.Component {

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