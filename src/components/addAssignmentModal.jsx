import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

const AddAssignmentModal = ({ show, onHide, onCreateAssignment }) => {
  /** Keeps track of what part we are currently on in assignment creation. */
  const [part, setPart] = useState(1);

  /** Part 1 */
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");

  /** Part 2 */
  const [selectedFriendlyUnits, setSelectedFriendlyUnits] = useState([]);

  /** Part 3 */
  const [selectedEnemyUnits, setSelectedEnemyUnits] = useState([]);

  /** Part 4 */
  const [friendlyAccuracy, setFriendlyAccuracy] = useState(0);
  const [enemyAccuracy, setEnemyAccuracy] = useState(0);
  const [timeRequirement, setTimeRequirement] = useState(0);

  /** Lines to import all of the images from public/CID Images */
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  function getDir(img) {
    return img.substring(0, img.indexOf("/"));
  }

  // images is a dictionary with path as key and image as value
  // use <img src={images['KEY']} /> to display image
  const images = importAll(require.context("../../public/CID Images"));

  // array of keys in images
  var keys = Object.keys(images);

  // unique contains keys of the first image of every vehicle
  var unique = [];

  // dir is a list of directories in CID Images (list of vehicle names)
  var dir = [];

  // firstImageDict is a dict with vehicle name: image path
  // ex: {"AAV: "}
  var firstImageDict = {};

  for (var i = 0; i < keys.length; i++) {
    if (!dir.includes(getDir(keys[i]))) {
      dir.push(getDir(keys[i]));
      unique.push(keys[i]);
      firstImageDict[getDir(keys[i])] = images[keys[i]];
    }
  }

  /** Parts can range from [1, 4].
   * Once nextPart is called and we are currently on part 4, we will submit and create a new assignment */
  const nextPart = () => {
    if (part == 4) {
      console.log(part);
      onCreateAssignment(
        assignmentName,
        assignmentDescription,
        selectedFriendlyUnits,
        selectedEnemyUnits,
        friendlyAccuracy,
        enemyAccuracy,
        timeRequirement
      );
      onHide();
      setPart(1);
    } else {
      setPart(part + 1);
    }
  };

  /** Corresponding helper function for part 2: friendly vehicle selection.
   * Records the selected vehicle as a friendly vehicle and stores it.
   */
  const handleSelectedFriendly = (event) => {
    const target = event.target;
    const checked = target.checked;
    const name = target.name;
    if (checked) {
      setSelectedFriendlyUnits([...selectedFriendlyUnits, name]);
    } else {
      let temp = [...selectedFriendlyUnits];
      let index = selectedFriendlyUnits.indexOf(name);
      temp.splice(index, 1);
      setSelectedFriendlyUnits(temp);
    }
  };

  /** Corresponding helper function for part 3: enemy vehicle selection. Records
   * the selected vehicle in the enemy vehicle list.
   */
  const handleSelectedEnemy = (event) => {
    const target = event.target;
    const checked = target.checked;
    const name = target.name;
    if (checked) {
      setSelectedEnemyUnits([...selectedEnemyUnits, name]);
    } else {
      let temp = [...selectedEnemyUnits];
      let index = selectedEnemyUnits.indexOf(name);
      temp.splice(index, 1);
      setSelectedEnemyUnits(temp);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setPart(1);
        onHide();
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {part === 1 && (
        <AssignmentNameEntry
          assignmentName={assignmentName}
          setAssignmentName={setAssignmentName}
          assignmentDescription={assignmentDescription}
          setAssignmentDescription={setAssignmentDescription}
          nextPart={nextPart}
        />
      )}
      {part === 2 && (
        <FriendlyVehicleSelector
          images={images}
          firstImageDict={firstImageDict}
          dir={dir}
          onSelectedFriendly={handleSelectedFriendly}
          nextPart={nextPart}
        />
      )}
      {part === 3 && (
        <EnemyVehicleSelector
          images={images}
          firstImageDict={firstImageDict}
          dir={dir}
          onSelectedEnemy={handleSelectedEnemy}
          nextPart={nextPart}
        />
      )}
      {part === 4 && (
        <RequirementsSelector
          friendlyAccuracy={friendlyAccuracy}
          setFriendlyAccuracy={setFriendlyAccuracy}
          enemyAccuracy={enemyAccuracy}
          setEnemyAccuracy={setEnemyAccuracy}
          timeRequirement={timeRequirement}
          setTimeRequirement={setTimeRequirement}
          nextPart={nextPart}
        />
      )}
    </Modal>
  );
};

/** Part 1 of creating an assignment. */
const AssignmentNameEntry = ({
  assignmentName,
  setAssignmentName,
  assignmentDescription,
  setAssignmentDescription,
  nextPart,
}) => {
  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Part 1: Name and Description
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter assignment name"
            onChange={(event) => setAssignmentName(event.target.value)}
            value={assignmentName}
          />
        </InputGroup>
        <InputGroup>
          <FormControl
            as="textarea"
            placeholder="Enter assignment description"
            onChange={(event) => setAssignmentDescription(event.target.value)}
            value={assignmentDescription}
          />
        </InputGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={nextPart}>
          Next
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
};

/** Part 2 of creating an assignment. */
// images: [AAV/image141.jpeg: "/static/media/image141.a60a3a3d.jpeg", ...]
// unique: ["AAV/image141.jpeg", "AH-1 Cobra/image241.jpeg",...]
// dir : ["AAV", "AH-1 Cobra", ...]
const FriendlyVehicleSelector = ({
  firstImageDict,
  dir,
  onSelectedFriendly,
  nextPart,
}) => {
  const ListGroupStyle = {
    maxHeight: "400px",
    overflow: "scroll",
  };
  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Part 2: Select Friendly Units
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup style={ListGroupStyle}>
                {dir.map((vehicle) => (
                  <ListGroup.Item action href={"#" + vehicle} key={vehicle}>
                    <Form.Check
                      type="checkbox"
                      name={vehicle}
                      label={vehicle}
                      onChange={onSelectedFriendly}
                    ></Form.Check>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <p>
                    Vehicle image previews go here. Click on a vehicle to view.
                  </p>
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <p>Hello</p>
                </Tab.Pane>
                {dir.map((vehicle) => (
                  <Tab.Pane eventKey={"#" + vehicle} key={vehicle}>
                    <Image src={firstImageDict[vehicle]} fluid />
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={nextPart}>
          Next
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
};

/** Part 3: Select all enemy vehicles */
const EnemyVehicleSelector = ({
  firstImageDict,
  dir,
  onSelectedEnemy,
  nextPart,
}) => {
  const ListGroupStyle = {
    maxHeight: "400px",
    overflow: "scroll",
  };
  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Part 3: Select Enemy Units
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup style={ListGroupStyle}>
                {dir.map((vehicle) => (
                  <ListGroup.Item action href={"#" + vehicle} key={vehicle}>
                    <Form.Check
                      type="checkbox"
                      name={vehicle}
                      label={vehicle}
                      onChange={onSelectedEnemy}
                    ></Form.Check>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <p>
                    Vehicle image previews go here. Click on a vehicle to view.
                  </p>
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <p>Hello</p>
                </Tab.Pane>
                {dir.map((vehicle) => (
                  <Tab.Pane eventKey={"#" + vehicle} key={vehicle}>
                    <Image src={firstImageDict[vehicle]} fluid />
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={nextPart}>
          Next
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
};
/** Part 4: setting the requirements. Currently helping with friendly & enemy accuracy as well as
 * setting a time rqeuiremnt.
 */
const RequirementsSelector = ({
  friendlyAccuracy,
  setFriendlyAccuracy,
  enemyAccuracy,
  setEnemyAccuracy,
  timeRequirement,
  setTimeRequirement,
  nextPart,
}) => {
  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Part 4: Set Requirements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Friendly accuracy"
                value={friendlyAccuracy}
                onChange={(event) => {
                  setFriendlyAccuracy(event.target.value);
                }}
              />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>

          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enemy accuracy"
                value={enemyAccuracy}
                onChange={(event) => setEnemyAccuracy(event.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>

          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Time requirement"
                value={timeRequirement}
                onChange={(event) => setTimeRequirement(event.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text>s</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={nextPart}>
          Submit
        </Button>
      </Modal.Footer>
    </React.Fragment>
  );
};

export default AddAssignmentModal;
