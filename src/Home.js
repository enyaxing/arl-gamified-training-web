import React, { Component } from 'react';
import firebase from './config/Fire';

// Takes in user
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
        };
        this.logout = this.logout.bind(this);
        this.getDocuments = this.getDocuments.bind(this);
        this.handleAddToList = this.handleAddToList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showClassList = this.showClassList.bind(this);
    }


    logout() {
        firebase.auth().signOut();  
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleAddToList(listName, newElement) {
        this.setState({ 
            [listName]: this.state.classes.concat([newElement])
        });
    }

    componentDidMount() {
        this.showClassList();
    }

    getDocuments(collectionName) {
        console.log(this.props.user.uid);
        var db = firebase.firestore().collection("users");
        db.doc(this.props.user.uid).collection(collectionName).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.handleAddToList(collectionName, doc.id);
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });
    }

    showClassList() {
        this.getDocuments("classes");
    }

    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <p>{this.props.user.email}</p>
                <p>{this.state.classes ? this.state.classes: ""}</p>
                <button onClick={this.logout}>Sign out</button>
            </div>
        );

    }

}

class ClassList extends React.Component {

}

export default Home;