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

    getDocuments(db, collectionName) {
        db.collection(collectionName).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.handleAddToList(collectionName, doc.id);
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });
    }

    showClassList() {
        var db = firebase.firestore().collection("users").doc(this.props.user.uid);
        this.getDocuments(db, "classes");
    }

    render() {
        return (
            <div>
                <h1>Instructor Homepage</h1>
                <p>{this.props.user.email}</p>
                <h3> Classes </h3>
                {this.state.classes ? (<ClassList classes={this.state.classes}/>) : "No classes"}
                <button onClick={this.logout}>Sign out</button>
            </div>
        );

    }

}

function ClassList(props) {
    const classes = props.classes;
    const listItems = classes.map((className) =>
        <p>{className}</p>
    );
    return (
        <p>{listItems}</p>
    );
}

function StudentList(props) {
    const students = props.students;
    const listItems = students.map((student) =>
        <p>{student}</p>
    );
    return (
        <p>{listItems}</p>
    );
}

export default Home;