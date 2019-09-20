import React, { Component } from 'react';
import cn from 'classnames';
import { Form, Button } from 'react-bootstrap';
import SnackBar from '@material-ui/core/Snackbar';
import axios from 'axios';

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
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'genre': this.state.songGenre.value,
                    'title': this.state.songTitle.value,
                    'artist': this.state.songArtist.value,
                    'length': seconds
                }
            }


            // reset Form --> TODO and validate in backend
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

    formIsValid = () => {
        const { songGenre, songTitle, songArtist, songLength } = this.state;
        let isValid = true;


        if (songGenre.value === "") {
            songGenre.isValid = false;
            songGenre.message = 'Please select a Song Genre!';
            isValid = false;
        } else {
            songGenre.isValid = true;
        }

        if (songTitle.value.length < 3) {
            songTitle.isValid = false;
            songTitle.message = 'The Song title must be at least 3 characters long!';
            isValid = false;
        } else {
            songTitle.isValid = true;
        }

        if (songArtist.value.length < 3) {
            songArtist.isValid = false;
            songArtist.message = 'The Artist name must be at least 3 characters long!';
            isValid = false;
        } else {
            songArtist.isValid = true;
        }

        if (!songLength.value.match('^([0-1][0-9]|[2][0-3]):([0-5][0-9])$')) {
            songLength.isValid = false;
            songLength.message = 'The Length of the Song must match the \'mm:ss\' pattern!';
            isValid = false;
        } else {
            songLength.isValid = true;
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