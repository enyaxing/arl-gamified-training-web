import React, { Component } from "react";
import "./App.css";
import fire from "./config/Fire";
import Chart from "./components/Chart";
import "bootstrap/dist/css/bootstrap.css";
import InstructorHome from "./instructorHome";
import Login from "./components/Login";

class App extends Component {
  constructor() {
    super();
    this.state = {
      accuracyData: {},
      user: null,
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
    this.getChartData();
  }

  getChartData() {
    // Ajax calls here
    this.setState({
      speedData: {
        labels: [
          "Session 1",
          "Session 2",
          "Session 3",
          "Session 4",
          "Session 5",
          "Session 6",
        ],
        datasets: [
          {
            label: "",
            data: [2.3, 3.0, 4.5, 2.3, 0.4, 1.3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      },

      accuracyData: {
        labels: [
          "Session 1",
          "Session 2",
          "Session 3",
          "Session 4",
          "Session 5",
          "Session 6",
        ],
        datasets: [
          {
            data: [100, 90, 50, 78, 83, 89],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      },
    });
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <InstructorHome user={this.state.user} />
        ) : (
          <Login />
        )}
        {/* <Chart accuracyData={this.state.accuracyData} legendPosition="bottom" /> */}
      </div>
    );
  }
}

export default App;
