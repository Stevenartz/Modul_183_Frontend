import React, { Component } from 'react';
import cn from 'classnames';
import { Form, Button } from 'react-bootstrap';

class AddSong extends Component {
    formDefaults = {
        songGenre: { value: 'pop', isValid: true, message: '' },
        songTitle: { value: 'So Long', isValid: true, message: '' },
        songArtist: { value: 'ESCPR', isValid: true, message: '' },
        songLength: { value: '02:55', isValid: true, message: '' },
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
        /* this.resetValidationStates(); */
        if (this.formIsValid()) {
            alert('>>> Form is valid!')
        }
    }

    formIsValid = () => {
        /* const songGenre = { ...this.state.songGenre }
        const songTitle = { ...this.state.songTitle }; */
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

    /*     resetValidationStates = () => {
            const state = JSON.parse(JSON.stringify(this.state));
    
            Object.keys(state).map(key => {
                if (state[key].hasOwnProperty('isValid')) {
                    state[key].isValid = true;
                    state[key].message = '';
                }
            });
    
            this.setState(state);
        } */

    resetForm = () => {
        this.setState(...this.formDefaults);
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
                    </Form>
                </div>
            </div>
        );
    }
};

export default AddSong;