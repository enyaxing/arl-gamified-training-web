import React, { Component } from "react";
import "../App.css";

class StatDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    var parsedInfo = []
    for (var key in this.props.info) {
        // check if the property/key is defined in the object itself, not in parent
        if (this.props.type === "percent") {
            parsedInfo.push(<li key = {key}>{key + "   " + Math.round(this.props.info[key] * 1000) / 10 + "%"}</li>)
        } else if (this.props.type ==="second") {
            parsedInfo.push(<li key = {key}>{key + "   " + Math.round(this.props.info[key] * 10) / 10 + " s"}</li>)
        }
    }
    return (
        <div className = "quarter">
            <h1>{this.props.name}</h1>
            <ul className = "scroll">
                {parsedInfo}
            </ul>
        </div>
    );
  }
}

export default StatDetails;
