import React, { Component } from "react";
import firebase from "./config/Fire";
import Upload from "./components/upload";

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
        <Upload />
      </div>
    );
  }
}

export default StudentHome;
