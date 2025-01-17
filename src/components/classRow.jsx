import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/** Component for each row in the ClassList. */
class ClassRow extends Component {
  render() {
    const { classId, onShowStudentTracker, onShowAssignments } = this.props;
    return (
      <Container>
        <Row>
          <Col md={8}>
            <p>{classId}</p>
          </Col>
          <Col>
            <Button variant="link" onClick={() => onShowAssignments(classId)}>
              Assignments
            </Button>
            <Button
              variant="link"
              onClick={() => onShowStudentTracker(classId)}
            >
              Student Tracker
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ClassRow;
