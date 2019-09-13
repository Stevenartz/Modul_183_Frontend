import React, { Component } from 'react';
import cn from 'classnames';
import { Form, Button } from 'react-bootstrap';

class AddSong extends Component {
    formDefaults = {
        songTitle: { value: '', isValid: true, message: '' },
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
        this.resetValidationStates();
        if (this.formIsValid()) {
            // form processing here....
        }
    }

    formIsValid = () => {
        const songTitle = { ...this.state.songTitle };
        let isGood = true;

        if (songTitle.value.length < 3) {
            songTitle.isValid = false;
            songTitle.message = 'Please fill in the full Song Title!';
            isGood = false;
        }

        // perform addtion validation on password and confirmPassword here...

        if (!isGood) {
            this.setState({
                songTitle,
            });
        }

        return isGood;
    }

    resetValidationStates = () => {
        // make a copy of everything in state
        const state = JSON.parse(JSON.stringify(this.state));

        /*
        loop through each item in state and if it's safe to assume that only
        form values have an 'isValid' property, we can use that to reset their
        validation states and keep their existing value property. This process
        makes it easy to set all validation states on form inputs in case the number
        of fields on our form grows in the future.
        */
        Object.keys(state).map(key => {
            if (state[key].hasOwnProperty('isValid')) {
                state[key].isValid = true;
                state[key].message = '';
            }
        });

        this.setState(state);
    }

    resetForm = () => {
        this.setState(...this.formDefaults);
    }

    render() {
        const { songTitle } = this.state;

        const songTitleGroupClass = cn(
            { 'is-invalid': !songTitle.isValid }
        );

        return (
            <div className='center-screen'>
                <div className='background'>
                    <h1>Add Song</h1>
                    <Form noValidate onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group controlId='controlId1'>
                            <Form.Label>Select Song Genre</Form.Label>
                            <Form.Control as='select'>
                                <option value=''>Select a Music Genre</option>
                                <option value='pop'>Pop</option>
                                <option value='rock'>Rock</option>
                                <option value='electronic'>Electronic</option>
                                <option value='hiphop'>Hip-Hop</option>
                                <option value='classic'>Classic</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Song Title</Form.Label>
                            <Form.Control
                                required
                                className={songTitleGroupClass}
                                autoComplete='off'
                                type="text"
                                name="songTitle"
                                value={songTitle.value}
                                onChange={this.onChange}
                            />
                            <h6>{songTitle.message}</h6>
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