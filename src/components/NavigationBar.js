import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

/** Navigation bar for the instructor portal.  */
const NavigationBar = ({ logout }) => {
  return (
    <Navbar bg="light">
      <Navbar.Brand href="#home">ARL Gamified Training</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav.Link href="/data">Data</Nav.Link>
        <Navbar.Text>
          <Button variant="light" onClick={logout}>
            Sign Out
          </Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
