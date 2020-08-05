import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Upload from "./upload";

/** Generates the pop-up modal to add a student.  */
const MultipleStudentAddModal = ({ show, onHide, onAddStudent }) => {
  /** Handles the addition of multiple students at once in a csv file.  */
  const handleMultiStudentAdd = (files) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      var allStudents = reader.result.split(/\r\n|\n/);
      allStudents.map((student) => onAddStudent(student));
    };
    reader.readAsText(files[0]);
  };

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
        <Button variant="light">
          <Upload
            handleFiles={handleMultiStudentAdd}
            uploadText="Upload a .csv file of students to add"
          ></Upload>
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default MultipleStudentAddModal;
