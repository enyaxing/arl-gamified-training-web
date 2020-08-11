import React, { Component } from "react";
import "./App.css";
import fire from "./config/Firebase";
import "bootstrap/dist/css/bootstrap.css";
import Data from "./components/Data";
import Homepage from "./Homepage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      type: null,
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user: user });
        this.getStudentType(user.uid);
      } else {
        this.setState({ user: null });
      }
    });
  };

  getStudentType = (userUID) => {
    let db = fire.firestore().collection("users").doc(userUID);
    var curr = this;

    db.get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data().userType);
          curr.setState({ type: doc.data().userType });
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
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/">
              <Homepage
                user={this.state.user}
                type={this.state.type}
              ></Homepage>
            </Route>
            <Route exact path="/data">
              <Data></Data>
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
