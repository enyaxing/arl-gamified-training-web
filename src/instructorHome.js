import React, { Component } from "react";
import firebase from "./config/Fire";
import ClassList from "./components/classList";
import StudentTracker from "./components/studentTracker";
import NavigationBar from "./components/NavigationBar";
import Container from "react-bootstrap/Container";
class InstructorHome extends Component {
  // classes is a dictionary of ClassName : {studentID: studentName}
  constructor(props) {
    super(props);
    this.state = {
      classes: {},
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

  // Remove student
  // Remove from instructor squad and also student side
  // Add student

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

  handleShowStudentTracker = (classId) => {
    this.setState({ showStudentTracker: !this.state.showStudentTracker });
    this.setState({ activeClassId: classId });
    console.log("Student Tracker");
  };

  handleShowAssignments = (classId) => {
    this.setState({ showAssignments: !this.state.showAssignments });
    this.setState({ activeClassId: classId });
    console.log("Show Assignments");
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
              showStudentTracker={this.state.showStudentTracker}
            />
          )}
        </Container>
      </div>
    );
  }
}

export default InstructorHome;
