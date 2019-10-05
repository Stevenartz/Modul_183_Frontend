import React, { Component } from 'react';
import cn from 'classnames';
import { Form, Button } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import axios from 'axios';
import cookies from 'react-cookies';
import * as Regex from '../../constants/Regex';


class AddSong extends Component {

    constructor(props) {
        super(props);
    }

    formDefaults = {
        songGenre: { value: 'pop', isValid: true, message: '' },
        songTitle: { value: 'So Long', isValid: true, message: '' },
        songArtist: { value: 'ESCPR', isValid: true, message: '' },
        songLength: { value: '02:55', isValid: true, message: '' },
        snackBarOpen: false,
    }

    state = {
        ...this.formDefaults
    };

    onChange = (e) => {
        const state = {
            ...this.state,
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value,
            }
        };
        this.setState(state);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.formIsValid()) {
            let timeArr = this.state.songLength.value.split(':');
            let seconds = (timeArr[0] * 60) + (+timeArr[1]);

            let url = 'http://localhost:8080/saveSong';

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + cookies.load('jwt'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'genre': this.state.songGenre.value,
                    'title': this.state.songTitle.value,
                    'artist': this.state.songArtist.value,
                    'length': seconds
                }
            }

            axios.post(url, null, config)
                .then(resp => {
                    if (resp.status === 200) {
                        return resp.data;
                    } else if (resp.status === 401) {
                        throw new Error();
                    }
                })
                .then(data => {
                    if (data) {
                        this.setState({ snackBarOpen: true })
                        this.setState({ ...this.formDefaults })
                    } else {
                        alert("Something went wrong while saving!");
                    }
                })

        }
    }

    // Escapes HTML Tags
    escapeHtml = text => {
        let map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return text.replace(/[&<>"']/g, function (m) { return map[m]; });
    }

    // Validates the whole song form.
    formIsValid = () => {
        let { songGenre, songTitle, songArtist, songLength } = this.state;
        let isValid = true;

        // Escape HTML
        songGenre.value = this.escapeHtml(songGenre.value.trim());
        songTitle.value = this.escapeHtml(songTitle.value.trim());
        songArtist.value = this.escapeHtml(songArtist.value.trim());
        songLength.value = this.escapeHtml(songLength.value.trim());


        if (songGenre.value.match(Regex.SONG_GENRE_REGEX) && songGenre.value.length > 0 && songGenre.value.length <= 30) {
            songGenre.isValid = true;
        } else {
            songGenre.isValid = false;
            songGenre.message = 'Please select a Song Genre!';
            isValid = false;
        }

        if (songTitle.value.match(Regex.SONG_TITLE_REGEX) && songTitle.value.length > 2 && songTitle.value.length <= 75) {
            songTitle.isValid = true;
        } else {
            songTitle.isValid = false;
            songTitle.message = 'The Song title must be at least 3 characters long and 75 characters short!';
            isValid = false;
        }

        if (songArtist.value.match(Regex.SONG_ARTIST_REGEX) && songArtist.value.length > 2 && songArtist.value.length <= 50) {
            songArtist.isValid = true;
        } else {
            songArtist.isValid = false;
            songArtist.message = 'The Artist name must be at least 3 characters long and 50 characters short!';
            isValid = false;
        }

        if (songLength.value.match(Regex.SONG_LENGTH_REGEX)) {
            songLength.isValid = true;
        } else {
            songLength.isValid = false;
            songLength.message = 'The Length of the Song must match the \'mm:ss\' pattern!';
            isValid = false;
        }

        if (!isValid) {
            this.setState({
                songGenre,
                songTitle,
                songArtist,
                songLength,
            });
        }

        return isValid;
    }

    render() {
        const { songGenre, songTitle, songArtist, songLength } = this.state;

        const songGenreGroupClass = cn(
            { 'is-invalid': !songGenre.isValid }
        );

        const songTitleGroupClass = cn(
            { 'is-invalid': !songTitle.isValid }
        );

        const songArtistGroupClass = cn(
            { 'is-invalid': !songArtist.isValid }
        );

        const songLengthGroupClass = cn(
            { 'is-invalid': !songLength.isValid }
        )

        return (
            <div className='center-screen'>
                <div className='background'>
                    <h1>Add Song</h1>
                    <Form noValidate onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group>
                            <Form.Label>Select Song Genre*</Form.Label>
                            <Form.Control
                                required
                                className={songGenreGroupClass}
                                autoComplete='off'
                                name='songGenre'
                                value={songGenre.value}
                                onChange={this.onChange}
                                as='select'
                            >
                                <option value=''>Select a Song Genre</option>
                                <option value='pop'>Pop</option>
                                <option value='rock'>Rock</option>
                                <option value='electronic'>Electronic</option>
                                <option value='hiphop'>Hip-Hop</option>
                                <option value='classic'>Classic</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {songGenre.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Song title*</Form.Label>
                            <Form.Control
                                required
                                className={songTitleGroupClass}
                                autoComplete='off'
                                type='text'
                                name='songTitle'
                                value={songTitle.value}
                                onChange={this.onChange}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {songTitle.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Artist*</Form.Label>
                            <Form.Control
                                required
                                className={songArtistGroupClass}
                                autoComplete='off'
                                type='text'
                                name='songArtist'
                                value={songArtist.value}
                                onChange={this.onChange}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {songArtist.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Song length (mm:ss)*</Form.Label>
                            <Form.Control
                                required
                                className={songLengthGroupClass}
                                autoComplete='off'
                                name='songLength'
                                value={songLength.value}
                                onChange={this.onChange}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {songLength.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            variant='primary'
                            type='submit'
                            size='lg'
                            block>
                            Submit!
                    </Button>
                        <SnackBar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            open={this.state.snackBarOpen}
                            onClose={() => this.setState({ snackBarOpen: false })}
                            autoHideDuration={2000}
                            variant='success'
                            message='Success!' />
                    </Form>

                </div>
            </div >
        );
    }
};

export default AddSong;