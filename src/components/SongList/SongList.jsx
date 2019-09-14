import React, { Component } from 'react';

class SongList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentDidMount = () => {
        let url = 'http://localhost:8080/getSongsByUsername';

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
                alert('failed: ' + e);
            })
    }

    render() {
        return (
            <div>
                <textarea
                    style={{ width: '600px', height: '800px' }}
                    value={JSON.stringify(this.state.user, undefined, 4)}
                    readOnly
                />
                <ul>
                    <li>Here will the list be loaded</li>
                </ul>
            </div >
        );
    }
};

export default SongList;