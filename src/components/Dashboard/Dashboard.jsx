import React from 'react';
import './Dashboard.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import cookies from 'react-cookies';

/**
 * Shows the dashboard.
 * 
 * Created on 2019-09-08
 * 
 * Author: Stefan Ulrich
 * Version 1.0
 */
class Dashboard extends React.Component {

    // Default constructor.
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    // Will be called on Component call.
    componentDidMount = () => {
        let url = 'http://localhost:8080/getPersonByUsername';

        let config = {
            headers: {
                'Authorization': 'Bearer ' + cookies.load('jwt'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        axios.get(url, config)
            .then(resp => {
                console.log("resp: " + resp.data)
                if (resp.status === 200) {
                    return resp.data;
                } else if (resp.status === 401) {
                    throw new Error();
                }
            })
            .then(data => {
                this.setState({ user: data })
            })
            .catch((e) => {
                alert('failed: ' + e);
            })
    }

    // Refers to a new page.
    changeToAddSong = () => {
        this.props.history.push('/addSong');
    }

    // Displays the Dashboard after successful login.
    render() {
        return (
            <div className='center-screen'>
                <div className='background'>
                    <h1 className='fadeInText'>Hi {this.state.user.firstname} {this.state.user.lastname}!</h1>
                    <h2 className='fade-in-top-1s-delay'>Ready to capture some songs for your playlist?</h2>
                    <Button
                        className='fade-in-top-2s-delay'
                        variant='success'
                        onClick={this.changeToAddSong}
                        size='lg'
                    >Add a new Song!</Button>
                </div>
            </div>
        )
    }
}

export default Dashboard;