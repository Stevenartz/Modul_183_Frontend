import React, { Component } from 'react';
import axios from 'axios';
import './SongList.css';
import cookies from 'react-cookies';
import 'datejs';

/**
 * Handles the SongList page.
 * 
 * Created on 2019-09-15
 * 
 * Author: Stefan Ulrich
 * Version 1.0
 */
class SongList extends Component {

    // Default constructor.
    constructor(props) {
        super(props);

        this.state = {
            user: []
        }
    }

    // Will be called on Component call.
    componentDidMount = () => {
        let url = 'http://localhost:8080/getSongsByUsername';

        let config = {
            headers: {
                'Authorization': 'Bearer ' + cookies.load('jwt'),
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

    // Show Table on page.
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
                                        <td>{(new Date).clearTime().addSeconds(item.length).toString('mm:ss')}</td>
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