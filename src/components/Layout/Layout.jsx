import React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';

import { Switch, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Authenticated from '../Authenticated/Authenticated';

class Layout extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Authenticated>
                        <Header />
                        <Route path="/dashboard" component={Dashboard} />
                    </Authenticated>
                </Switch>
            </div>
        )
    }
}

export default Layout;