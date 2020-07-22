import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import firebase from "../config/Fire";
import Button from "react-bootstrap/Button";

class StudentTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentDetails: {},
    };
  }

  componentDidMount() {
    Object.keys(
      this.props.classes[this.props.selectedClass].students
    ).map((studentID) => this.getStudentDetails(studentID));
  }

  componentDidUpdate(prevProps) {
    // console.log(
    //   Object.keys(prevProps.classes[this.props.selectedClass].students).length
    // );
    // console.log(
    //   Object.keys(this.props.classes[this.props.selectedClass].students).length
    // );
    // if (
    //   Object.keys(prevProps.classes[this.props.selectedClass].students)
    //     .length != Object.keys(this.state.studentDetails).length
    // ) {
    //   Object.keys(
    //     this.props.classes[this.props.selectedClass].students
    //   ).map((studentID) => this.getStudentDetails(studentID));
    // }
  }

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

  render() {
    const {
      onRemoveStudent,
      selectedClass,
      onShowAddStudentModal,
    } = this.props;
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
                        onClick={() =>
                          onRemoveStudent(studentID, selectedClass)
                        }
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
              onShowAddStudentModal();
            }}
          >
            Add Student
          </Button>
        </div>
      );
    } else {
      return <p>No students in this class.</p>;
    }
  }
}

export default StudentTracker;
