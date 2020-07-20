import React, { Component } from "react";
import "./App.css";
import fire from "./config/Fire";
import "bootstrap/dist/css/bootstrap.css";
import InstructorHome from "./instructorHome";
import StudentHome from "./studentHome";
import Login from "./components/Login";
import Data from "./components/Data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      type: null
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
        this.getStudentType(user.uid)
      } else {
        this.setState({ user: null });
      }
    });
  };

  getStudentType = (userUID) => {
      let db = fire
        .firestore()
        .collection("users")
        .doc(userUID);
      var curr = this

      db.get().then(function(doc) {
          if (doc.exists) {
              console.log("Document data:", doc.data().userType);
              curr.setState({type: doc.data().userType} )
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
   };

  render() {
    if (this.state.user) {
        if (this.state.type === "student") {
            return (
                <div className = "App">
                    <StudentHome user={this.state.user} />
                </div>
            );
        } else {
            return (
                <div className = "App">
                    <InstructorHome user={this.state.user} />
                    <Data />
                </div>
            );
        }
    } else {
        return (
          <div className="App">
              <div
                class="d-flex align-items-center justify-content-center"
                style={{ height: 300 }}
              >
                <Login />
              </div>
          </div>
        );
    }
  }
}

export default App;
