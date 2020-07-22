import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import firebase from "../config/Fire";
let lineData;

const firstLine = {
  labels: ["Tue Jul 07 2020 06:51:37 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 09:51:38 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:10:04 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:12:40 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:15:17 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:16:49 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 13:01:05 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 13:03:06 GMT-0700 (Pacific Daylight Time)", "Wed Jul 08 2020 10:08:58 GMT-0700 (Pacific Daylight Time)", "Thu Jul 09 2020 12:16:06 GMT-0700 (Pacific Daylight Time)", "Thu Jul 09 2020 12:17:00 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:12:10 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:16:45 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:20:44 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:28:30 GMT-0700 (Pacific Daylight Time)"]
,
  datasets: [
    {
      label: "Average Response Rate (seconds)",
      fill: false,
      fontColor: "black",
      backgroundColor: "red",
      borderColor: "red",
      data: [1500, 1700, 1850, 1900, 2000, 2200, 1500, 1100, 800, 900, 2000, 400],
    },
    {
      label: "Average Response Rate for Student A (seconds)",
      fill: false,
      data: [1237, 1326, 761, 657, 729, 467, 989, 827, 504, 998, 664, 1600, 2000, 1200, 800], // Student A
    },
    {
      label: "Average Response Rate for Student B (seconds)",
      fill: false,
      data: [2207], // Student B
    }
  ],
};

const secondLine = {
  labels: ["Tue Jul 07 2020 06:51:37 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 09:51:38 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:10:04 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:12:40 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:15:17 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:16:49 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 13:01:05 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 13:03:06 GMT-0700 (Pacific Daylight Time)", "Wed Jul 08 2020 10:08:58 GMT-0700 (Pacific Daylight Time)", "Thu Jul 09 2020 12:16:06 GMT-0700 (Pacific Daylight Time)", "Thu Jul 09 2020 12:17:00 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:12:10 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:16:45 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:20:44 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:28:30 GMT-0700 (Pacific Daylight Time)"]
,
  datasets: [
    {
      label: "Average Correctness (%)",
      fill: false,
      fontColor: "black",
      backgroundColor: "blue",
      borderColor: "blue",
      data: [1500, 1700, 1850, 1900, 2000, 2200, 1500, 1100, 800, 900, 2000, 400],
    },
    {
      label: "Average Correctness for Student A (%)",
      fill: false,
      data: [1237, 1326, 761, 657, 729, 467, 989, 827, 504, 998, 664, 1600, 2000, 1200, 800], // Student A
    },
    {
      label: "Average Correctness for Student B (%)",
      fill: false,
      data: [2207], // Student B
    }
  ],
};

lineData = {
  labels: ["Tue Jul 07 2020 06:51:37 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 09:51:38 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:10:04 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:12:40 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:15:17 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 10:16:49 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 13:01:05 GMT-0700 (Pacific Daylight Time)", "Tue Jul 07 2020 13:03:06 GMT-0700 (Pacific Daylight Time)", "Wed Jul 08 2020 10:08:58 GMT-0700 (Pacific Daylight Time)", "Thu Jul 09 2020 12:16:06 GMT-0700 (Pacific Daylight Time)", "Thu Jul 09 2020 12:17:00 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:12:10 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:16:45 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:20:44 GMT-0700 (Pacific Daylight Time)", "Wed Jul 15 2020 07:28:30 GMT-0700 (Pacific Daylight Time)"]
,
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
      sessions: {},
      selectedType: "Time",
    };
  }

  changeType(event) {
    let db = firebase.firestore().collection("users").doc("DO9VAxAM8lRm5l67Quvex3bIhnh1").collection("sessions");
    var sessions = []
    db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        sessions[doc.data().time.toDate()] = doc.data().points;
      });
    });

    this.setState({
      selectedType: event.target.value,
      sessions: sessions,
    });

    switch (event.target.value) {
      case "Time":
      firstLine.labels = Object.keys(this.state.sessions)
      firstLine.datasets[1].data = Object.values(this.state.sessions)
      console.log(Object.keys(this.state.sessions))
      console.log(Object.values(this.state.sessions))
      // firstLine.datasets[2].data = Object.values(this.state.sessions2)
      lineData = firstLine;

        break;
      case "Accuracy":
        lineData = secondLine;
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
