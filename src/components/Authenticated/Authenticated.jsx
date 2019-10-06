import React from 'react';
import { Redirect } from 'react-router-dom';
import cookies from 'react-cookies';

/**
 * Checks if the user is authenticated.
 * 
 * Created on 2019-09-08
 * 
 * Author: Stefan Ulrich
 * Version 1.0
 */
class Authenticated extends React.Component {

    // Default constructor.
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            redirect: false,
        }
    }

    // Will be called on Component call.
    componentDidMount() {
        if (!cookies.load('jwt')) {
            this.setState({ ...this.state, redirect: true });
        }

        let url = 'http://localhost:8080/getPersonByUsername';

        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + cookies.load('jwt'));

        fetch(url, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.text();
                } else if (resp.status === 401) {
                    throw new Error(resp);
                }
            })
            .then(data => {
                this.setState({ user: data });
            })
            .catch((resp) => {
                cookies.remove(
                    'jwt',
                    {
                        path: '/',
                        domain: 'localhost',
                    }
                );
                this.setState({ ...this.state, redirect: true });
            })
    }

    // Renders the children if the user is authenticated, otherwise the user is redirected to the login page.
    render() {
        if (!this.state.redirect) {
            if (this.state.user === undefined) {
                return (
                    <div><h1>Loading...</h1></div>
                )
            } else {
                return (
                    <div>
                        {this.props.children}
                    </div>
                )
            }
        } else {
            return <Redirect to='/login' />
        }
    }
}

export default Authenticated;