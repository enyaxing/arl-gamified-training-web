import React, { Component } from "react";
import firebase from "./config/Fire";
import ClassList from "./components/classList";
import StudentTracker from "./components/studentTracker";

class InstructorHome extends Component {
  // classes is a dictionary of ClassName : {studentID: studentName}
  constructor(props) {
    super(props);
    this.state = {
      classes: {},
    };
  }

  logout = () => {
    firebase.auth().signOut();
  };
  componentDidMount() {
    this.getClassList();
  }

  getClassList = () => {
    let db = firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.uid)
      .collection("classes");
    var classes = [];
    db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let prev = { ...this.state.classes };
        prev[doc.id] = doc.data();
        this.setState({
          classes: prev,
        });
      });
    });
  };

  render() {
    return (
      <div>
        <h1>Instructor Homepage</h1>
        <p>{this.props.user.email}</p>
        <button onClick={this.logout}>Sign out</button>
        {this.state.classes ? (
          <ClassList classes={this.state.classes} />
        ) : (
          "No classes created"
        )}
        <StudentTracker classes={this.state.classes}></StudentTracker>
      </div>
    );
  }
}

export default InstructorHome;
