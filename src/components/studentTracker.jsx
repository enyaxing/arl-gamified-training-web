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
  componentDidMount() {
    this.getStudentDetails("YQCQQRLjyWTpKgChODgqyMzxTh62");
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
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  render() {
    const { classes } = this.props;
    if (Object.keys(classes).length > 0) {
      console.log(classes["Squad 13"].students);
      return (
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(classes["Squad 13"].students).map(
              ([studentID, studentName]) => (
                <tr>
                  <td>{studentName}</td>
                  <td>{studentID}</td>
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
