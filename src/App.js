import React, { Component } from "react";
import "./App.css";
import fire from "./config/Fire";
import "bootstrap/dist/css/bootstrap.css";
import InstructorHome from "./instructorHome";
import Login from "./components/Login";
import Data from "./components/Data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <InstructorHome user={this.state.user} />
            <Data />
          </div>
        ) : (
          <div
            class="d-flex align-items-center justify-content-center"
            style={{ height: 300 }}
          >
            <Login />
          </div>
        )}
      </div>
    );
  }
}

export default App;
