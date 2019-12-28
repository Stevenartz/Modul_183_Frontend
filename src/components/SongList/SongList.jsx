import React, { Component } from 'react';
import axios from 'axios';
import './SongList.css';
import cookies from 'react-cookies';
import 'datejs';
import crossIcon from '../../assets/errorIcons/error_icon_24px.png';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

    // Method to delete a song by id.
    deleteSongById = song => {
        let url = 'http://localhost:8080/deleteSongById';

        let config = {
            headers: {
                'Authorization': 'Bearer ' + cookies.load('jwt'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'songId': song.id,
            }
        }

        confirmAlert({
            title: 'Are you sure?',
            message: "Do you really want to delete the song: '" + song.title + "'?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(url, config)
                            .then(resp => {
                                if (resp.status === 200) {
                                    return resp.data;
                                } else if (resp.status === 401) {
                                    throw new Error();
                                }
                            })
                            .then(data => {
                                this.componentDidMount();
                            })
                            .catch((e) => {
                                alert('failed: ' + e);
                            })
                    }
                },
                {
                    label: 'No',
                }
            ]
        });



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
                                <th>Delete</th>
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
                                        {/* Icon made by Smashicons perfect from www.flaticon.com */}
                                        <td>
                                            <img
                                                onClick={() => this.deleteSongById(item)}
                                                className={'crossIcon'}
                                                src={crossIcon} />
                                        </td>
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