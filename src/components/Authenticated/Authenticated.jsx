import React from 'react';
import { Redirect } from 'react-router-dom';

class Authenticated extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            redirect: false,
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('jwt')) {
            this.setState({ ...this.state, redirect: true });
        }

        let url = 'http://localhost:8080/getPersonByUsername';

        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

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
                localStorage.removeItem('jwt');
                this.setState({ ...this.state, redirect: true });
            })
    }

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