import React, { Component } from "react";
import firebase from "./config/Fire";

import ClassList from "./components/classList";
import Assignments from "./components/Assignments";
import StudentTracker from "./components/studentTracker";

import NavigationBar from "./components/NavigationBar";
import Container from "react-bootstrap/Container";

class InstructorHome extends Component {
  // Classes is a list of all classes
  // Changing it to just list of class names
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      showStudentTracker: false,
      showAssignments: false,
      activeClassId: "",
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
    db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let prev = [...this.state.classes, doc.id];
        this.setState({
          classes: prev,
        });
      });
    });
  };

  handleShowStudentTracker = (classId) => {
    this.setState({ showAssignments: false });
    this.setState({ showStudentTracker: !this.state.showStudentTracker });
    this.setState({ activeClassId: classId });
  };

  handleShowAssignments = (classId) => {
    this.setState({ showStudentTracker: false });
    this.setState({ showAssignments: !this.state.showAssignments });
    this.setState({ activeClassId: classId });
  };

  render() {
    return (
      <div>
        <NavigationBar logout={this.logout}></NavigationBar>
        <Container>
          <h1>Instructor Portal</h1>
          <p>{this.props.user.email}</p>
          {this.state.classes ? (
            <ClassList
              classes={this.state.classes}
              onShowStudentTracker={this.handleShowStudentTracker}
              onShowAssignments={this.handleShowAssignments}
            />
          ) : (
            "No classes created"
          )}
          {this.state.showStudentTracker && (
            <StudentTracker
              classes={this.state.classes}
              selectedClass={this.state.activeClassId}
              user={this.props.user}
            />
          )}

          {this.state.showAssignments && (
            <Assignments
              selectedClass={this.state.activeClassId}
              user={this.props.user}
            ></Assignments>
          )}
        </Container>
      </div>
    );
  }
}

export default InstructorHome;
