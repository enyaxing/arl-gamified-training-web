import React, { Component } from "react";
import ClassRow from "./classRow";

/** Component for list of all classes.  */
class ClassList extends Component {
  render() {
    const { classes, onShowStudentTracker, onShowAssignments } = this.props;
    return (
      <div>
        <br></br>
        <h2>CLASSES</h2>
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
