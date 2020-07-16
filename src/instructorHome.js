import React, { Component } from "react";
import firebase from "./config/Fire";
import ClassList from "./components/classList";

class InstructorHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
    };
  }

  logout = () => {
    firebase.auth().signOut();
  };
  componentWillMount() {
    this.getClassList();
  }

  getClassList = () => {
    let db = firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.uid)
      .collection("classes");
    var classes = [];
    db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().students}`);
        // console.log(doc.data());
        this.setState((prevState) => ({
          classes: [...prevState.classes, doc.id],
        }));
      });
    });
    // console.log(classToStudentDict);
  };

  render() {
    return (
      <div>
        <h1>Instructor Homepage</h1>
        <p>{this.props.user.email}</p>
        <button onClick={this.logout}>Sign out</button>
        {this.state.classes ? (
          <ClassList classes={[this.state.classes]} name={this.state.name} />
        ) : (
          "No classes created"
        )}
      </div>
    );
  }
}

export default InstructorHome;
