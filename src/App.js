
import React, { Component } from 'react';
import './App.css';
import fire from './config/Fire';
import Home from './Home';
import Login from './Login';
import {Line} from 'react-chartjs-2';

let lineData;

const lineDataSpend = {
  labels: ['July 15', 'July 16', 'July 17', 'July 18', 'July 19', 'July 20', 'July 21'],
  datasets: [
    {
      label: 'Average Time Per Session (seconds)',
      fill: false,
      backgroundColor: 'red',
      borderColor: 'red',
      data: [60, 40, 80, 50, 55, 35, 40]
    }
  ]
};

const lineDataRev = {
  labels: ['July 15', 'July 16', 'July 17', 'July 18', 'July 19', 'July 20', 'July 21'],
  datasets: [
    {
      label: 'Average Percent Correct',
      fill: false,
      backgroundColor: 'blue',
      borderColor: 'blue',
      data: [25, 65, 55, 85, 100, 75, 65]
    }
  ]
};

lineData = {
  labels: ['July 15', 'July 16', 'July 17', 'July 18', 'July 19', 'July 20', 'July 21'],
  datasets: [
    {
      label: 'Average Time Per Session (seconds)',
      fill: false,
      backgroundColor: 'red',
      borderColor: 'red',
      data: [60, 40, 80, 50, 55, 35, 40]
    }
  ]
};

class App extends Component {

  constructor(props) {
    super(props);
    this.changeMetric = this.changeMetric.bind(this);
    this.state = {
      selectedMetric: 'Spend',
      user: null
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
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

  changeMetric(event) {

    this.setState({
      selectedMetric: event.target.value
    });

    switch (event.target.value) {
      case 'Time':
        lineData = lineDataSpend;
        break;
      case 'Accuracy':
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
        text: 'Performance Trends'
      },
      tooltips: {
        enabled: true,
        callbacks: {
          label: function (value, data) {
            console.log('data', data)
            const currentLabel = data.datasets[value.datasetIndex].label;
            return currentLabel + value.yLabel;
          }
        }
      },
      legend: {
        display: true
      },
      maintainAspectRatio: true,
      scales: {
        yAxes: [{
          ticks: {
            callback: function (value) {
              return parseFloat(value.toFixed(2));
            }
          },
          stacked: false,
          gridLines: {
            display: true,
            color: "rgba(255,99,132,0.2)"
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      }

    };

    return (
      <div className="App">
     {this.state.user ? (<Home user={this.state.user}/>) : (<Login />)}
      <div>
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
    </div>
    );
  }
}

 export default App;
