import React, { Component } from "react";
import ClassRow from "./classRow";

class ClassList extends Component {
  render() {
    const { classes, onShowStudentTracker, onShowAssignments } = this.props;
    return (
      <div>
        <br></br>
        <h2>CLASSES</h2>
        {/* {console.log(Object.keys(classes))} */}
        {classes.map((classId) => (
          <ClassRow
            classId={classId}
            key={classId}
            onShowStudentTracker={onShowStudentTracker}
            onShowAssignments={onShowAssignments}
          ></ClassRow>
        ))}
      </div>
    );
  }
}

export default ClassList;
