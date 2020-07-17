import React, { Component } from "react";
import { Line } from "react-chartjs-2";
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
    this.changeMetric = this.changeMetric.bind(this);
    this.state = {
      selectedMetric: "Time",
    };
  }
  changeMetric(event) {
    this.setState({
      selectedMetric: event.target.value,
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
        text: "Performance Trends",
      },
      legend: {
        display: true,
      },
      maintainAspectRatio: true,
      scales: {
        yAxes: [
          {
            display: true,
            scaleLabel: {
            display: true,
            labelString: 'Average'
          },
          ticks: {
              callback: function (value) {
                return parseFloat(value.toFixed(2));
              },
            },
            stacked: false,
            gridLines: {
              display: true,
            },
          },
        ],
        xAxes: [
          {
            display: true,
            scaleLabel: {
            display: true,
            labelString: 'Date'
          },
            gridLines: {
            display: true,
            },
          },
        ],
      },
    };

    return (
      <div class="align-items-center justify-content-center">
        <select onChange={this.changeMetric} value={this.state.selectedMetric}>
          <option value="Time">Time</option>
          <option value="Accuracy">Accuracy</option>
        </select>
        <div className="row">
          <div className="col-xl-10">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify" />
              </div>
              <div className="card-block">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Data;
