import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import firebase from "../config/Fire";

class StudentTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentDetails: {},
    };
  }
  componentDidUpdate(prevProps) {
    if (
      Object.keys(prevProps.classes).length !==
      Object.keys(this.props.classes).length
    ) {
      Object.keys(this.props.classes["Squad 13"].students).map((studentID) =>
        this.getStudentDetails(studentID)
      );
    }
    // this.getStudentDetails("YQCQQRLjyWTpKgChODgqyMzxTh62");
  }
  getStudentDetails = (studentID) => {
    let db = firebase.firestore().collection("users").doc(studentID);
    db.get()
      .then((doc) => {
        if (doc.exists) {
          let prev = { ...this.state.studentDetails };
          prev[doc.id] = doc.data();
          this.setState({
            studentDetails: prev,
          });
          console.log(prev);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  render() {
    if (Object.keys(this.state.studentDetails).length > 0) {
      return (
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Focus</th>
              <th>Accuracy (%)</th>
              <th>Average Response Rate (s)</th>
              <th>Total Sessions (#)</th>
              <th>Total Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(this.state.studentDetails).map(
              ([studentID, details]) => (
                <tr key={studentID}>
                  <td>{details.name}</td>
                  <td>{studentID}</td>
                  <td>{details.focus}</td>
                  <td>{details.accuracy}</td>
                  <th>{details.avgResponseRate}</th>
                  <th>{details.totalSessions}</th>
                  <th>{details.totalTime}</th>
                </tr>
              )
            )}
          </tbody>
        </Table>
      );
    } else {
      return <p>No students in this class.</p>;
    }
  }
}

export default StudentTracker;
