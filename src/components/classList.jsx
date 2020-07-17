import React, { Component } from "react";
import ClassRow from "./classRow";

class ClassList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <br></br>
        <h2>CLASSES</h2>
        {/* {console.log(Object.keys(classes))} */}
        {Object.keys(classes).map((className) => (
          <ClassRow className={className} key={className}></ClassRow>
        ))}
      </div>
    );
  }
}

export default ClassList;
