import React, { Component } from "react";
import fire from "../config/Fire";
import Session from "../components/session"

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data : null,
        // references
        session : null,
        question : null
    };
    this.handleSessionChange = this.handleSessionChange.bind(this)
  }

  componentDidMount() {
      this.getInfo(this.props.user.uid);
   }

  getInfo = (userUID) => {
      let db = fire.firestore().collection("users").doc(userUID);
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

   handleSessionChange = (event, id) => {
        console.log(id)
        this.setState({session : id})
   }

  render() {
    if (this.state.data == null) {
        return (<h1>Loading ... </h1>)
    }
    return (
        <div>
            <h1>Name: {this.state.data.name}</h1>
            <h1>Username: {this.state.data.user}</h1>
            <h1>Focus type: {this.state.data.focus}</h1>
            <h1>Accuracy: {Math.round(this.state.data.accuracy * 10) / 10}</h1>
            <h1>Average Response Time: {Math.round(this.state.data.avgResponseRate * 10) / 10}</h1>
            <h1>Total Sessions: {this.state.data.totalSessions}</h1>
            <h1>TotalTime: {Math.round(this.state.data.totalTime *10) / 10}</h1>
            <Session user = {this.props.user} session = {this.state.session} handleSessionChange = {this.handleSessionChange}/>
        </div>
    );
  }
}

export default Profile;
