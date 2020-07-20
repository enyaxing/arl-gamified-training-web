import React, { Component } from "react";
import firebase from "./config/Fire";

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

  render() {
    return (
      <div>
        <h1>Student Home</h1>
        <p>{this.props.user.email}</p>
        <button onClick={this.logout}>Sign out</button>
      </div>
    );
  }
}

export default InstructorHome;
