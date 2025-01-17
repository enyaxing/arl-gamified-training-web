import React, { Component } from "react";
import fire from "../config/Firebase";
import Session from "../components/session";
import SessionSummary from "../components/sessionSummary";
import SummaryDetail from "../components/summaryDetail";
import StudentStats from "../components/studentStats";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

/** Profile page on the student portal. */
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data : null,
        // references
        session : null,
        question : null,
        location : "sessions"
    };
    this.handleSessionChange = this.handleSessionChange.bind(this)
    this.handleQuestionChange = this.handleQuestionChange.bind(this)
  }

  /** Get student info when the component mounts. */
  componentDidMount() {
      this.getInfo(this.props.user.uid);
   }

  /** Read student data from Firebase.
  Parameters:
    userUID - UID of student. */
  getInfo = (userUID) => {
      let db = fire.firestore().collection("users").doc(userUID);
      var curr = this;
      db.get()
        .then(function (doc) {
          if (doc.exists) {
            curr.setState({ data : doc.data()});
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    };

  /** Function called when session is changed. */
   handleSessionChange = (event, id) => {
        console.log(id)
        this.setState({session : id})
   }

   /** Function called when question is changed. */
   handleQuestionChange = (event, id) => {
       console.log(id)
       this.setState({question : id})
  }

  /** Function called when location changed (ie sessions vs stats) */
  handleLocationChange = (event, id) => {
         console.log(id)
         this.setState({location : id})
    }

  /** Tab selector for changing locations (ie sessions vs stats) */
  locationSelector = () => {
    if (this.state.location === "sessions") {
        return (<div>
                <Session user = {this.props.user} session = {this.state.session} handleSessionChange = {this.handleSessionChange}/>
                <SessionSummary
                    user = {this.props.user}
                    session = {this.state.session}
                    key = {this.state.session}
                    question = {this.state.question}
                    handleQuestionChange = {this.handleQuestionChange}/>
                <SummaryDetail
                    user = {this.props.user}
                    session = {this.state.session}
                    key = {this.state.question}
                    answer = {this.state.question}/>
                </div>);
    } else if (this.state.location === "stats") {
        return (<StudentStats user = {this.props.user}/>)
    } else if (this.state.location === "achievements") {
        return (<h1>No Achievements</h1>);
    }
  }

  render() {
    if (this.state.data == null) {
        return (<h1>Loading ... </h1>)
    }
    var bottom = this.locationSelector()
    return (
        <div>
            <h1>Name: {this.state.data.name}</h1>
            <h1>Username: {this.state.data.user}</h1>
            <h1>Focus type: {this.state.data.focus}</h1>
            <h1>Accuracy: {Math.round(this.state.data.accuracy * 10) / 10}</h1>
            <h1>Average Response Time: {Math.round(this.state.data.avgResponseRate * 10) / 10}</h1>
            <h1>Total Sessions: {this.state.data.totalSessions}</h1>
            <h1>TotalTime: {Math.round(this.state.data.totalTime *10) / 10}</h1>

            <ToggleButtonGroup
                  exclusive
                  value={this.state.location}
                  onChange={this.handleLocationChange}
                  style = {{width:"100%"}}
            >
                <ToggleButton value = "sessions">
                    <h1>Sessions</h1>
                </ToggleButton>
                <ToggleButton value = "stats">
                    <h1>Stats</h1>
                </ToggleButton>
                <ToggleButton value = "achievements">
                    <h1>Achievements</h1>
                </ToggleButton>
            </ToggleButtonGroup>
            {bottom}
            <br className="clearBoth"/>
        </div>
    );
  }
}

export default Profile;
