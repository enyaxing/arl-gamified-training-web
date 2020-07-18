import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import firebase from "../config/Fire";
let lineData;

const lineDataSpend = {
  labels: [
    "July 15",
    "July 16",
    "July 17",
    "July 18",
    "July 19",
    "July 20",
    "July 21",
  ],
  datasets: [
    {
      label: "Average Time (seconds)",
      fill: false,
      fontColor: "black",
      backgroundColor: "red",
      borderColor: "red",
      data: [60, 40, 80, 50, 55, 35, 40],
    },
  ],
};

const lineDataRev = {
  labels: [
    "July 15",
    "July 16",
    "July 17",
    "July 18",
    "July 19",
    "July 20",
    "July 21",
  ],
  datasets: [
    {
      label: "Average Correctness (%)",
      fill: false,
      fontColor: "black",
      backgroundColor: "blue",
      borderColor: "blue",
      data: [25, 65, 55, 85, 100, 75, 65],
    },
  ],
};

lineData = {
  labels: [
      "July 15",
      "July 16",
      "July 17",
      "July 18",
      "July 19",
      "July 20",
      "July 21",
  ],
  datasets: [
    {
      label: "Average Time (seconds)",
      fill: false,
      backgroundColor: "red",
      borderColor: "red",
      data: [60, 40, 80, 50, 55, 35, 40],
    },
  ],
};


class Data extends Component {
  constructor(props) {
    super(props);
    this.changeType = this.changeType.bind(this);
    this.state = {
      selectedType: "Time",
    };
  }

  changeType(event) {
    this.setState({
      selectedType: event.target.value,
    });

    switch (event.target.value) {
      case "Time":
        lineData = lineDataSpend;
        break;
      case "Accuracy":
        lineData = lineDataRev;
        break;
      default:
    }
  }

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
          <div className="line-data">
              <Line data={lineData} options={lineOptions} />
          </div>
      </div>
    );
  }
}

export default Data;
