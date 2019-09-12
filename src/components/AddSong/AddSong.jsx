import React from 'react';
import './AddSong.css';

class AddSong extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <div className='center-screen'>
                <div className='background'>
                    Add song
                </div>
            </div>
        )
    }
}

export default AddSong;