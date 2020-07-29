import React, { Component, useEffect } from "react";
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
    this.setState({
      showAddAssignmentModal: !this.state.showAddAssignmentModal,
    });
  };

  createAssignment = (
    name,
    description,
    friendlyUnits,
    enemyUnits,
    friendlyAccuracy,
    enemyAccuracy,
    timeRequirement
  ) => {
    let classDB = firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.uid)
      .collection("classes")
      .doc(this.props.selectedClass);
    let assignmentRef = classDB.collection("assignments").doc(name);
    // Add user to class from instructor side
    assignmentRef
      .set({
        name: name,
        description: description,
        friendly: friendlyUnits,
        enemy: enemyUnits,
        friendlyAccuracy: parseInt(friendlyAccuracy).toFixed(2),
        enemyAccuracy: parseInt(enemyAccuracy).toFixed(2),
        time: timeRequirement,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    this.getAssignmentList();
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
                <th>Enemy Vehicles</th>
                <th>Friendly Accuracy (%)</th>
                <th>Enemy Accuracy (%)</th>
                <th>Time Requirement (s)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(this.state.assignments).map(
                ([assignmentName, details]) => (
                  <tr key={assignmentName}>
                    <td>{assignmentName}</td>
                    <td>{details.description}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      {details.friendly.map((vehicle) => (
                        <p key={vehicle}>{vehicle}</p>
                      ))}
                    </td>
                    <td>
                      {details.enemy.map((vehicle) => (
                        <p key={vehicle}>{vehicle}</p>
                      ))}
                    </td>
                    <td>{details.friendlyAccuracy}</td>
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
            user={this.props.user}
            selectedClass={this.props.selectedClass}
          ></AddAssignmentModal>
        </React.Fragment>
      );
    } else {
      return <p>No assignments created.</p>;
    }
  }
}

export default Assignments;
