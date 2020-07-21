import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import firebase from "../config/Fire";
let lineData;

const getKeys = (studentID) => {
  let db = firebase
    .firestore()
    .collection("users")
    .doc(studentID)
    .collection("sessions");
  var sessions = []
  db.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      sessions[doc.id] = doc.data().points;
    });

    console.log(Object.keys(sessions))
    return Object.keys(sessions);
  });
};

const getValues = (studentID) => {
  let db = firebase
    .firestore()
    .collection("users")
    .doc(studentID)
    .collection("sessions");
  var sessions = [];
  var values = [];
  db.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      sessions[doc.id] = doc.data().points;
    });
    values = Object.values(sessions);
    console.log(values)
    // const arrAvg = (values => values.reduce((a,b) => a + b, 0) / values.length);
    // console.log(arrAvg(values) / 4000)
    return values;
  });
};

const lineDataSpend = {
  type: [
    getKeys("YQCQQRLjyWTpKgChODgqyMzxTh62"),
  ],
  labels: [
    getKeys("DO9VAxAM8lRm5l67Quvex3bIhnh1"),
],
  datasets: [
    {
      label: "Average Response Rate (seconds)",
      fill: false,
      fontColor: "black",
      backgroundColor: "red",
      borderColor: "red",
      data: [60, 40, 80, 50, 55, 35, 40],
    },
    {
      label: "Average Response Rate for Student A (seconds)",
      fill: false,
      data: getValues("DO9VAxAM8lRm5l67Quvex3bIhnh1"), // Student A
    },
    {
      label: "Average Response Rate for Student B (seconds)",
      fill: false,
      data: getValues("YQCQQRLjyWTpKgChODgqyMzxTh62"), // Student B
    }
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
    {
      label: "Average Correctness for Student A (%)",
      fill: false,
      data: [10, 20, 60, 40, 50, 30, 100], // Student A
    },
    {
      label: "Average Correctness for Student B (%)",
      fill: false,
      data: [70, 60, 40, 55, 65, 30, 80], // Student B
    }
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
      label: "Average Response Rate (seconds)",
      fill: false,
      fontColor: "black",
      backgroundColor: "red",
      borderColor: "red",
      data: [60, 40, 80, 50, 55, 35, 40],
    },
    {
      label: "Average Response Rate for Student A (seconds)",
      fill: false,
      data: [10, 20, 30, 70, 60, 55, 50], // Student A
    },
    {
      label: "Average Response Rate for Student B (seconds)",
      fill: false,
      data: [70, 40, 50, 60, 30, 45, 80], // Student B
    }
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
