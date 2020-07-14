import React, { Component } from 'react';
import firebase from './config/Fire';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        firebase.auth().signOut();  
    }

    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <button onClick={this.logout}>Sign out</button>
            </div>
        );

    }

}

export default Home;