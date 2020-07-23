import React, { Component } from "react";
import fire from "../config/Fire";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import "../App.css";

class SessionSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data : [],
    };
  }

  componentDidMount() {
    if (this.props.session != null) {
        this.getSummary(this.props.user.uid, this.props.session);
    }
  }

  getSummary = (userUID, session) => {
        let db = fire.firestore().collection("users").doc(userUID).collection("sessions").doc(session).collection("answers");
        var curr = this;
        db.get()
          .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      // doc.data() is never undefined for query doc snapshots
                      var newData = [{id : doc.id, expected: doc.data().expected, received: doc.data().received, image: doc.data().image}];
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
        var correct = "Incorrect"
        if (this.state.data[i].received === this.state.data[i].expected) {
            correct = "Correct"
        }

        items.push(
        <ToggleButton value = {this.state.data[i].id} key = {i}>
            <img src={process.env.PUBLIC_URL + this.state.data[i].image} alt={this.state.data[i].image} width="50" height="50"/>
            <div>{correct}</div>
        </ToggleButton>)
    }

    return (
        <ToggleButtonGroup
              orientation="vertical"
              exclusive
              value={this.props.question}
              onChange={this.props.handleQuestionChange}
              className = "sessions"
            >
            {items}
        </ToggleButtonGroup>
    );
  }
}

export default SessionSummary;
