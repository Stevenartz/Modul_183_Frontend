import React from 'react';
import './Dashboard.css';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentDidMount = () => {
        let url = 'http://localhost:8080/getPersonByUsername';

        let headers = new Headers();

        headers.append('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        fetch(url, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else if (resp.status === 401) {
                    throw new Error();
                }
            })
            .then(data => {
                this.setState({ user: data })
            })
            .catch((e) => {
                alert("failed: " + e);
            })
    }

    changeToAddSong = () => {
        this.props.history.push('/addSong');
    }

    render() {
        return (
            <div className='center-screen'>
                <div className='background'>
                    <h1 className='fadeInText'>Hi {this.state.user.firstname} {this.state.user.lastname}!</h1>
                    <h2 className='fade-in-top-1s-delay'>Ready to capture some songs for your playlist?</h2>
                    <button className='fade-in-top-2s-delay btn' onClick={this.changeToAddSong}>Add a new Song!</button>
                </div>
            </div>
        )
    }
}

export default Dashboard;