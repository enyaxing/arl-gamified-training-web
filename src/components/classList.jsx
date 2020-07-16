import React, { Component } from "react";
import ClassRow from "./classRow";

class ClassList extends Component {
  componentDidMount() {
    console.log("Hi");
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <br></br>
        <h2>CLASSES</h2>
        {classes.map((className) => (
          <ClassRow className={className}></ClassRow>
        ))}
      </div>
    );
  }
}

export default ClassList;
