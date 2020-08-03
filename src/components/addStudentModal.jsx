import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

/** Pop-up modal to add a student. Takes in a variable on whether it should be shown,
 * onHide function to close the modal, and onAddStudent which is called when a new
 * student is added.
 */
const AddStudentModal = ({ show, onHide, onAddStudent }) => {
  /** Stores the student email.  */
  const [studentEmail, setStudentEmail] = useState("");
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter student email"
            onChange={(event) => setStudentEmail(event.target.value)}
            value={studentEmail}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onAddStudent(studentEmail);
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStudentModal;
