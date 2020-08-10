import React, { Component } from "react";
import firebase from "../config/Firebase";
/** Default login page. */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  };

  signup = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .then((u) => {
        console.log(u);
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <h1> ARL Gamified Training</h1>
            <form>
              <div className="form-group">
                {/* <label for="exampleInputEmail1">Email address</label> */}
                <input
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                {/* <label for="exampleInputPassword1">Password</label> */}
                <input
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                onClick={this.login}
                className="btn btn-primary"
              >
                Login
              </button>
              <button
                onClick={this.signup}
                style={{ marginLeft: "25px" }}
                className="btn btn-success"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
