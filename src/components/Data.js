import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import firebase from "../config/Firebase";
let lineData;

lineData = {
  labels: ["Tue Jul 07 2020", "Wed Jul 08 2020", "Thurs Jul 09 2020", "Wed Jul 15 2020"],
  datasets: [
    {
      label: "Average Response Rate (seconds)",
      fill: false,
      fontColor: "black",
      backgroundColor: "red",
      borderColor: "red",
      data: [1.8, 1.5, 0.8, 2.2]
    },
    {
      label: "Average Response Rate for Student A (seconds)",
      fill: false,
      data: [1.2, 1.5, 0.8, 2.2]
    },
    {
      label: "Average Response Rate for Student B (seconds)",
      fill: false,
      data: [2.4],
    }
  ],
};

const firstLine = {
  labels: [],
  datasets: [
    {
      fill: false,
      fontColor: "black",
      data: []
    },
    {
      fill: false,
      data: []
    },
    {
      fill: false,
      data: [],
    }
  ],
};

class Data extends Component {
  constructor(props){
    super(props);
    this.changeType = this.changeType.bind(this);
    this.state = {
      sessions: {},
      session2: {},
      selectedType: "Time",
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  changeType(event) {
    this.setState({
      selectedType: event.target.value,
    });

    switch (event.target.value) {
      case "Accuracy":
        firstLine.labels = Object.keys(this.state.sessions)
        firstLine.datasets[0].backgroundColor = "blue"
        firstLine.datasets[0].borderColor = "blue"
        firstLine.datasets[0].label = "Average Correctness (%)"
        firstLine.datasets[1].label = "Average Correctness for Student A (%)"
        firstLine.datasets[2].label = "Average Correctness for Student B (%)"
        firstLine.datasets[0].data = [1513.5, 504, 664, 800]
        firstLine.datasets[1].data = Object.values(this.state.sessions)
        firstLine.datasets[2].data = Object.values(this.state.sessions2)
        lineData = firstLine;
        break;
      case "Time":
        firstLine.labels = Object.keys(this.state.sessions)
        firstLine.datasets[0].backgroundColor = "red"
        firstLine.datasets[0].borderColor = "red"
        firstLine.datasets[0].label = "Average Response Rate (seconds)"
        firstLine.datasets[1].label = "Average Response Rate for Student A (seconds)"
        firstLine.datasets[2].label = "Average Response Rate for Student B (seconds)"
        firstLine.datasets[0].data = [1.8, 1.5, 0.8, 2.2]
        firstLine.datasets[1].data = [1.2, 1.5, 0.8, 2.2]
        firstLine.datasets[2].data = [2.4]
        lineData = firstLine;
        break;
      default:
    }
  }

  getChartData = () => {
    let db = firebase.firestore().collection("users").doc("DO9VAxAM8lRm5l67Quvex3bIhnh1").collection("sessions");
    db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let prev = { ...this.state.sessions};
        prev[doc.data().time.toDate().toDateString()] = doc.data().points;
        this.setState({
          sessions: prev,
        });
      });
    });

    db = firebase.firestore().collection("users").doc("YQCQQRLjyWTpKgChODgqyMzxTh62").collection("sessions");
    db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let prev = { ...this.state.sessions2};
        prev[doc.data().time.toDate().toDateString()] = doc.data().points;
        this.setState({
          sessions2: prev,
        });
      });
    });

  };

  render() {
    const lineOptions = {
      title: {
        display: true,
        fontSize: 24,
        fontColor: "black",
        text: "Performance Trends",
      },
      legend: {
        labels: {
         fontColor: 'black'
      },
        display: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "black",
          },
            scaleLabel: {
            display: true,
            fontColor: "black",
            labelString: 'Average',
          },
            stacked: false,
            gridLines: {
              fontColor: "black",
              display: true,
            },
          },
        ],
        xAxes: [
          {
          ticks: {
              fontColor: "black",
          },
            scaleLabel: {
            display: true,
            fontColor: "black",
            labelString: 'Date',
          },
            gridLines: {
            display: true,
            fontColor: "black",
            },
          },
        ],
      },
    };

    return (
          <div class="Data">
            <select onChange={this.changeType} value={this.state.selectedType}>
              <option value="Time">Time</option>
              <option value="Accuracy">Accuracy</option>
            </select>
              <div className="lineData">
                  <Line data={lineData} options={lineOptions} />
              </div>
          </div>
        );
      }
    }

export default Data;
