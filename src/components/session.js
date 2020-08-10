import React, { Component } from "react";
import fire from "../config/Firebase";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import "../App.css";

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data : []
    };
  }

  componentDidMount() {
    this.getSessions(this.props.user.uid);
  }

  getSessions = (userUID) => {
        let db = fire.firestore().collection("users").doc(userUID).collection("sessions");
        var curr = this;
        db.get()
          .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      var newData = [{id : doc.id, date : doc.data().time, type : doc.data().type, points: doc.data().points}];
                      curr.setState({data : curr.state.data.concat(newData)});
                  });
              })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
  };

  render() {
    if (this.state.data.length === 0) {
        return (<div></div>)
    }
    var items = []
    for (var i = 0; i < this.state.data.length; i++) {
        items.push(
        <ToggleButton value = {this.state.data[i].id} key = {i}>
            <div>{this.state.data[i].date.toDate().toString()}  </div>
            <div>{this.state.data[i].type}  </div>
            <div>{this.state.data[i].points}  </div>
        </ToggleButton>)
    }

    return (
        <ToggleButtonGroup
              orientation="vertical"
              exclusive
              value={this.props.session}
              onChange={this.props.handleSessionChange}
              className = "sessions"
            >
            {items}
        </ToggleButtonGroup>
    );
  }
}

export default Session;
