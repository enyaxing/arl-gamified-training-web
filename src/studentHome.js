import React, { Component } from "react";
import firebase from "./config/Fire";
import NavBar from "./components/navbar";
import Home from "./studentPages/home";
import Question from "./studentPages/question";
import Training from "./studentPages/training";
import Gonogo from "./studentPages/gonogo";
import Settings from "./studentPages/settings";
import Profile from "./studentPages/profile";
import About from "./studentPages/about";

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
        location : "home"
    };
    this.setLocation = this.setLocation.bind(this)
  }

  logout = () => {
    firebase.auth().signOut();
  };

  setLocation = (loc) => {
      this.setState({ location : loc })
      console.log(loc)
  };

  changeLocation = () => {
    switch(this.state.location) {
        case 'question':
            return (<Question user = {this.props.user}/>);
        case 'training':
            return (<Training />);
        case 'gonogo':
            return (<Gonogo />);
        case 'settings':
            return (<Settings />);
        case 'profile':
            return (<Profile user = {this.props.user}/>);
        case 'about':
            return (<About />);
        default:
            return (<Home />);
    }
  }

  render() {
    return (
      <div>
        <h1>Student Portal</h1>
        <p>{this.props.user.email}</p>
        <NavBar setLocation = {this.setLocation} />
        {this.changeLocation()}
        <button onClick={this.logout}>Sign out</button>
      </div>
    );
  }
}

export default StudentHome;
