import React, { Component } from "react";
import fire from "../config/Fire";
import "../App.css";
import StatDetails from "./statDetails";
import tags from "../tags";

/** Tab that dispalys detailed student stats. */
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

  /** Get stats when component mounts. */
  componentDidMount() {
    this.getStats(this.props.user.uid)
  }

  /** Get stats.
  Parameters:
    userUID - user UID. */
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

                                for (var i = 0; i < tags.length; i++) {
                                    if (docu.data().image === tags[i].image) {
                                        for (var j = 0; j < tags[i].tags.length; j++) {
                                            var label = tags[i].tags[j]
                                            if (label in tagCount) {
                                                tagCount[label] += 1
                                                tagTime[label] += docu.data().time
                                            } else {
                                                tagCount[label] = 1
                                                tagTime[label] = docu.data().time
                                            }
                                            if (docu.data().expected === docu.data().received) {
                                                if (label in tagAccuracy) {
                                                    tagAccuracy[label] += 1
                                                } else {
                                                    tagAccuracy[label] = 1
                                                }
                                            }

                                            var tempAcc2 = curr.state.tagPercent
                                            var tempSec2 = curr.state.tagSecond
                                            tempAcc2[label] = tagAccuracy[label] / tagCount[label]
                                            tempSec2[label] = tagTime[label] / tagCount[label]
                                            curr.setState({tagPercent: tempAcc2, tagSecond: tempSec2})
                                        }
                                        break
                                    }
                                }


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
            <StatDetails name = "Tag Accuracy" info = {this.state.tagPercent} type = "percent"/>
            <StatDetails name = "Tag Time" info = {this.state.tagSecond} type = "second"/>
        </div>
    );
  }
}

export default StudentStats;
