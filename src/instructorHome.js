import React, { Component } from "react";
import firebase from "./config/Fire";
import ClassList from "./components/classList";
import Assignments from "./components/Assignments";
import StudentTracker from "./components/studentTracker";
import AddStudentModal from "./components/addStudentModal";
import NavigationBar from "./components/NavigationBar";
import Container from "react-bootstrap/Container";

class InstructorHome extends Component {
  // classes is a dictionary of ClassName : {studentID: studentName}
  constructor(props) {
    super(props);
    this.state = {
      classes: {},
      assignments: {},
      showStudentTracker: false,
      showAssignments: false,
      showAddStudentModal: false,
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

  removeStudent = (studentID, studentClass) => {
    let instructorDB = firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.uid)
      .collection("classes")
      .doc(studentClass);

    instructorDB
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Update state variable
          let prev = { ...this.state.classes };
          delete prev[studentClass].students[studentID];
          this.setState({
            classes: prev,
          });
          // Update firestore side
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    // Update student side
    // let studentDB = firebase.firestore().collection("users").doc(studentID);
  };

  // Add student
  // users/grJCmQGHkfb3AgCOfRvbya8p2pk2/classes/Squad 13
  addStudent = (studentEmail) => {
    var classId = this.state.activeClassId;
    var homeInstance = this;
    console.log("Add student to", this.state.activeClassId);
    console.log(studentEmail);
    let userDB = firebase.firestore().collection("users");
    userDB
      .where("user", "==", studentEmail)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var studentID = doc.id;
          var data = doc.data();
          var studentName = data.name;

          // Add a class to user field
          doc.ref.update({ class: classId });
          // Add a class to instructor side
          homeInstance.updateInstructorSideStudentList(studentName, studentID);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  // Helper function for add student
  // Add user to class from instructor side
  updateInstructorSideStudentList = (studentName, studentID) => {
    let instructorRef = firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.uid)
      .collection("classes")
      .doc(this.state.activeClassId);

    instructorRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          var studentUpdate = {};
          studentUpdate["students." + studentID] = studentName;
          console.log(studentUpdate);
          doc.ref.update(studentUpdate);
          this.updateClassesDict(studentName, studentID);
          console.log("Logged!");
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  // Helper function to add a student
  updateClassesDict = (studentName, studentID) => {
    let prev = { ...this.state.classes };
    prev[this.state.activeClassId].students[studentID] = studentName;
    this.setState({
      classes: prev,
    });
  };

  toggleShowAddStudentModal = () => {
    this.setState({ showAddStudentModal: !this.state.showAddStudentModal });
  };

  getClassList = () => {
    let db = firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.uid)
      .collection("classes");
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
              onRemoveStudent={this.removeStudent}
              onShowAddStudentModal={this.toggleShowAddStudentModal}
            />
          )}

          {this.state.showAssignments && (
            <Assignments
              selectedClass={this.state.activeClassId}
              user={this.props.user}
            ></Assignments>
          )}
          <AddStudentModal
            show={this.state.showAddStudentModal}
            onHide={this.toggleShowAddStudentModal}
            onAddStudent={this.addStudent}
          ></AddStudentModal>
        </Container>
      </div>
    );
  }
}

export default InstructorHome;
