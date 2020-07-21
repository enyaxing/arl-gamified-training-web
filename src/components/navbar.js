import React, { Component } from "react";
import { ButtonGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <ButtonGroup>
        <Button onClick = {() => this.props.setLocation("home")}>Home</Button>
        <Button onClick = {() => this.props.setLocation("question")}>Questionairre</Button>
        <Button onClick = {() => this.props.setLocation("training")}>Training</Button>
        <Button onClick = {() => this.props.setLocation("gonogo")}>Go/No-Go</Button>
        <Button onClick = {() => this.props.setLocation("settings")}>Settings</Button>
        <Button onClick = {() => this.props.setLocation("about")}>About</Button>
        <Button onClick = {() => this.props.setLocation("profile")}>Profile</Button>
      </ButtonGroup>
    );
  }
}

export default NavBar;
