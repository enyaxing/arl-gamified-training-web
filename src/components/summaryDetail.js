import React, { Component } from "react";
import fire from "../config/Firebase";
import "../App.css";

class SummaryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data : null
    };
  }

  componentDidMount() {
    if (this.props.session != null && this.props.answer != null) {
        this.getSummary(this.props.user.uid, this.props.session, this.props.answer);
    }
  }

  getSummary = (userUID, session, answer) => {
      let db = fire.firestore().collection("users").doc(userUID).collection("sessions").doc(session).collection("answers").doc(answer);
      var curr = this;
      db.get()
        .then(function (doc) {
              if (doc.exists) {
                curr.setState({ data : doc.data()});
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            .catch(function (error) {
              console.log("Error getting document:", error);
        });
   };

  render() {
    if (this.state.data == null) {
        return (<div></div>)
    }

    return (
        <div className = "sessions">
        <img src={process.env.PUBLIC_URL + this.state.data.image} alt={this.state.data.image} width="300" height="300"/>
        <p> The correct answer is {this.state.data.expected}
        <br /> You chose {this.state.data.received}
        <br /> You answered in {Math.round(this.state.data.time * 10) / 10} seconds
        <br /> (This is a {this.state.data.vehicleName})
        </p>
        </div>
    );
  }
}

export default SummaryDetail;
