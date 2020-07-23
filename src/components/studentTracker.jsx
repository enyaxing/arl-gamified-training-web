import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import firebase from "../config/Fire";
import Button from "react-bootstrap/Button";
import AddStudentModal from "../components/addStudentModal";
import firebasePkg from "firebase/app";
class StudentTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentDetails: {},
      showAddStudentModal: false,
    };
  }

  componentDidMount() {
    this.getAllStudents();
  }

  getAllStudents = () => {
    let instructorRef = firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.uid)
      .collection("classes")
      .doc(this.props.selectedClass);
    let homeInstance = this;
    instructorRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          var data = doc.data();
          let studentMap = data.students;
          Object.keys(studentMap).forEach(function (key) {
            homeInstance.getStudentDetails(key);
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  getStudentDetails = (studentID) => {
    let db = firebase.firestore().collection("users").doc(studentID);
    db.get()
      .then((doc) => {
        if (doc.exists) {
          let prev = { ...this.state.studentDetails };
          let formattedData = this.formatStudentData(doc.data());
          prev[doc.id] = formattedData;
          this.setState({
            studentDetails: prev,
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  formatStudentData = (studentData) => {
    let docData = { ...studentData };
    docData.totalTime = new Date(studentData.totalTime * 1000)
      .toISOString()
      .substr(11, 8);
    docData.avgResponseRate = studentData.avgResponseRate.toFixed(2);
    docData.accuracy = studentData.accuracy.toFixed(2);
    return docData;
  };

  toggleShowAddStudentModal = () => {
    this.setState({ showAddStudentModal: !this.state.showAddStudentModal });
  };

  // Remove student
  // Remove from instructor squad and also student side

  removeStudent = (studentID) => {
    let userRef = firebase.firestore().collection("users").doc(studentID);
    let instructorRef = firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.uid)
      .collection("classes")
      .doc(this.props.selectedClass);
    // Update state variable
    let prev = { ...this.state.studentDetails };
    if (prev.hasOwnProperty(studentID)) {
      delete prev[studentID];
      this.setState({
        studentDetails: prev,
      });
    }

    instructorRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Update firestore side
          doc.ref.update({
            ["students." +
            studentID]: firebasePkg.firestore.FieldValue.delete(),
          });

          // Update user side
          userRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                // Update state variable
                doc.ref.update({
                  class: firebasePkg.firestore.FieldValue.delete(),
                });
              } else {
                console.log("No such document!");
              }
            })
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
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
    var classId = this.props.selectedClass;
    var homeInstance = this;
    console.log("Add student to", this.props.selectedClass);
    console.log(studentEmail);
    let userDB = firebase.firestore().collection("users");

    let instructorRef = firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.uid)
      .collection("classes")
      .doc(this.props.selectedClass);

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
          doc.ref.update({ class: instructorRef });

          // Add user to class from instructor side
          instructorRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                var studentUpdate = {};
                studentUpdate["students." + studentID] = studentName;
                doc.ref.update(studentUpdate);
              } else {
                console.log("No such document!");
              }
            })
            .catch(function (error) {
              console.log("Error getting document:", error);
            });

          // Update studentDetails
          homeInstance.getStudentDetails(studentID);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  render() {
    const { selectedClass } = this.props;
    if (Object.keys(this.state.studentDetails).length > 0) {
      return (
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Focus</th>
                <th>Accuracy (%)</th>
                <th>Average Response Rate (s)</th>
                <th>Total Sessions (#)</th>
                <th>Total Time (s)</th>
                <th>
                  <Button variant="light">Edit Students</Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(this.state.studentDetails).map(
                ([studentID, details]) => (
                  <tr key={studentID}>
                    <td>{details.name}</td>
                    <td>{details.focus}</td>
                    <td>{details.accuracy}</td>
                    <th>{details.avgResponseRate}</th>
                    <th>{details.totalSessions}</th>
                    <th>{details.totalTime}</th>
                    <th>
                      <Button
                        variant="danger"
                        onClick={() => this.removeStudent(studentID)}
                      >
                        Remove
                      </Button>
                    </th>
                  </tr>
                )
              )}
            </tbody>
          </Table>
          <Button
            variant="light"
            onClick={() => {
              this.toggleShowAddStudentModal();
            }}
          >
            Add Student
          </Button>
          <AddStudentModal
            show={this.state.showAddStudentModal}
            onHide={this.toggleShowAddStudentModal}
            onAddStudent={this.addStudent}
          ></AddStudentModal>
        </div>
      );
    } else {
      return (
        <div>
          <p>No students in this class.</p>
          <Button
            variant="light"
            onClick={() => {
              this.toggleShowAddStudentModal();
            }}
          >
            Add Student
          </Button>
          <AddStudentModal
            show={this.state.showAddStudentModal}
            onHide={this.toggleShowAddStudentModal}
            onAddStudent={this.addStudent}
          ></AddStudentModal>
        </div>
      );
    }
  }
}

export default StudentTracker;
