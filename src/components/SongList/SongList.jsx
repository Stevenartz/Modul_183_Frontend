import React, { Component } from 'react';
import axios from 'axios';
import './SongList.css';

class SongList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: []
        }
    }

    componentDidMount = () => {
        let url = 'http://localhost:8080/getSongsByUsername';

        let config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        axios.get(url, config)
            .then(resp => {
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

    render() {
        return (
            <div className='center-screen'>
                <div className='background'>
                    <table>
                        <thead>
                            <tr>
                                <th>Genre</th>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Length</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.genre}</td>
                                        <td>{item.title}</td>
                                        <td>{item.artist}</td>
                                        <td>{item.length}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

export default SongList;