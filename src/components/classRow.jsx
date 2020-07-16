import React, { Component } from "react";

class ClassRow extends Component {
  render() {
    const { className } = this.props;
    return (
      <div>
        <p>{className}</p>
      </div>
    );
  }
}

export default ClassRow;
