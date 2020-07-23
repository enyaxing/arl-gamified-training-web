import React, { Component } from "react";
import fire from "../config/Fire";
import "../App.css";
import StatDetails from "./statDetails";

class StudentStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
        vehiclePercent: {},
        tagPercent: {},
        vehicleSecond: {},
        tagSecond: {}
    };
  }

  componentDidMount() {
    this.getStats(this.props.user.uid)
  }

  getStats = (userUID) => {
        let db = fire.firestore().collection("users").doc(userUID).collection("sessions")
        var curr = this;

        var vehicleTime = {}
        var tagTime = {}
        var vehicleAccuracy = {}
        var tagAccuracy = {}
        var vehicleCount = {}
        var tagCount = {}

        db.get()
          .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      // doc.data() is never undefined for query doc snapshots
                      let ans = db.doc(doc.id).collection("answers")
                      ans.get()
                        .then(function(querySnapshot2) {
                            querySnapshot2.forEach(function(docu) {
                                let name = docu.data().vehicleName
                                if (!(name in vehicleCount)) {
                                    vehicleCount[name] = 1
                                    vehicleTime[name] = docu.data().time
                                    if (docu.data().expected === docu.data().received) {
                                        vehicleAccuracy[name] = 1
                                    } else {
                                        vehicleAccuracy[name] = 0
                                    }
                                } else {
                                    vehicleCount[name] += 1
                                    vehicleTime[name] += docu.data().time
                                    if (docu.data().expected === docu.data().received) {
                                        vehicleAccuracy[name] += 1
                                    }
                                }
                                var tempAcc = curr.state.vehiclePercent
                                var tempSec = curr.state.vehicleSecond
                                tempAcc[name] = vehicleAccuracy[name] / vehicleCount[name]
                                tempSec[name] = vehicleTime[name] / vehicleCount[name]
                                curr.setState({vehiclePercent: tempAcc, vehicleSecond: tempSec})
                            })
                        })
                  });
              })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
  };

  render() {
    return (
        <div>
            <StatDetails name = "Vehicle Accuracy" info = {this.state.vehiclePercent} type = "percent"/>
            <StatDetails name = "Vehicle Time" info = {this.state.vehicleSecond} type = "second"/>
            <StatDetails name = "Tag Accuracy" info = {[]} type = "percent"/>
            <StatDetails name = "Tag Time" info = {[]} type = "second"/>
        </div>
    );
  }
}

export default StudentStats;
