import React from "react";
import InstructorHome from "./instructorHome";
import StudentHome from "./studentHome";
import Login from "./components/Login";
const Homepage = ({ user, type }) => {
  if (user) {
    if (type === "student") {
      return <StudentHome user={user}></StudentHome>;
    } else {
      return <InstructorHome user={user}></InstructorHome>;
    }
  } else {
    return <Login></Login>;
  }
};

export default Homepage;
