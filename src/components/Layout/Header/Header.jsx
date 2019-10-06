import React from 'react';
import Navigation from '../Navigation/Navigation';

/**
 * Simply shows just the navigation.
 * 
 * Created on 2019-09-08
 * 
 * Author: Stefan Ulrich
 * Version 1.0
 */
class Header extends React.Component {

    // Renders only the navigation.
    render() {
        return (
            <header>
                <Navigation />
            </header>
        )
    }
}

export default Header;