import React, { Component } from "react";
import firebase from "../config/Fire";
import Table from "react-bootstrap/Table";
import AddAssignmentModal from "./addAssignmentModal";
import Button from "react-bootstrap/Button";

class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: {},
      showAddAssignmentModal: false,
    };
  }
  componentDidMount() {
    this.getAssignmentList();
  }

  getAssignmentList = () => {
    let db = firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.uid)
      .collection("classes")
      .doc(this.props.selectedClass)
      .collection("assignments");
    db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let prev = { ...this.state.assignments };
        prev[doc.id] = doc.data();
        this.setState({
          assignments: prev,
        });
      });
    });
  };

  toggleShowAddAssignmentModal = () => {
    this.setState({ showAddAssignmentModal: !this.state.showAddStudentModal });
  };

  createAssignment = () => {
    console.log("Hi");
  };

  render() {
    if (Object.keys(this.state.assignments).length > 0) {
      return (
        <React.Fragment>
          <Table responsive>
            <thead>
              <tr>
                <th>Assignment Name</th>
                <th>Description</th>
                <th>Date Assigned</th>
                <th>Date Due</th>
                <th>Friendly Vehicles</th>
                <th>Friendly Accuracy</th>
                <th>Enemy Vehicles</th>
                <th>Enemy Accuracy</th>
                <th>Time Requirement</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(this.state.assignments).map(
                ([assignmentName, details]) => (
                  <tr key={assignmentName}>
                    <td>{assignmentName}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{details.friendly}</td>
                    <td>{details.friendlyAccuracy}</td>
                    <td>{details.enemy}</td>
                    <td>{details.enemyAccuracy}</td>
                    <td>{details.time}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
          <Button onClick={this.toggleShowAddAssignmentModal}>
            Create Assignment
          </Button>
          <AddAssignmentModal
            show={this.state.showAddAssignmentModal}
            onHide={this.toggleShowAddAssignmentModal}
            onCreateAssignment={this.createAssignment}
          ></AddAssignmentModal>
        </React.Fragment>
      );
    } else {
      return <p>No students in this class.</p>;
    }
  }
}

export default Assignments;
