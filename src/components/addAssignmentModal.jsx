import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const AddAssignmentModal = ({ show, onHide, onCreateAssignment }) => {
  const [studentEmail, setStudentEmail] = useState("");

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  function getDir(img) {
    return img.substring(0, img.indexOf("/"));
  }

  // images is a dictionary with path as key and image as value
  // use <img src={images['KEY']} /> to display image
  const images = importAll(require.context('../../public/CID Images'));

  // array of keys in images
  var keys = Object.keys(images);

  // unique contains keys of the first image of every vehicle
  var unique = [];

  // dir is a list of directories in CID Images (list of vehicle names)
  var dir = [];

  for (var i = 0; i < keys.length; i++) {
    if (!dir.includes(getDir(keys[i]))) {
        dir.push(getDir(keys[i]));
        unique.push(keys[i]);
    }
  }

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
          Create Assignment
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
            onCreateAssignment(studentEmail);
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAssignmentModal;
