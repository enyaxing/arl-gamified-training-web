import React, { Component } from "react";
import fire from "../config/Firebase";
import { ButtonGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";

class Training extends Component {
  constructor(props) {
    super(props);
    this.state = {
        friendly: {},
        enemy:{},
        img:"",
        index:0
    };
    this.images = this.importAll(require.context("../../public/CID Images"));
  }

  componentDidMount() {
      this.getVehicles(this.props.user.uid);
  }

  getVehicles = (userUID) => {
        let db = fire.firestore().collection("users").doc(userUID);
        var curr = this;
        db.get()
          .then(function (doc) {
            if (doc.exists) {

              for (var i = 0; i < doc.data().friendly.length; i++) {
                for (var key in curr.images) {
                    if (key.includes(doc.data().friendly[i])) {
                        var temp = curr.state.friendly;
                        temp[key] = curr.images[key];
                        curr.setState({friendly : temp});
                    }
                }
              }

             for (var i = 0; i < doc.data().enemy.length; i++) {
                 for (var key in curr.images) {
                     if (key.includes(doc.data().enemy[i])) {
                         var temp = curr.state.enemy;
                         temp[key] = curr.images[key];
                         curr.setState({enemy : temp});
                     }
                 }
               }

            console.log(Object.keys(curr.state.friendly));
            console.log(Object.keys(curr.state.enemy));
            curr.generateRandom();

            } else {
              console.log("No such document!");
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      };

  /** Lines to import all of the images */
    importAll = (r) => {
      let images = {};
      r.keys().map((item, index) => {
        images[item.replace("./", "")] = r(item);
      });
      return images;
    }

   friendlyButton = () => {
        this.generateRandom();
   }

   enemyButton = () => {
        this.generateRandom();
   }

   generateRandom = () => {
        var index = Math.round(Math.random());
        var folder = {};
        if (index === 0) {
            folder = this.state.friendly
        } else {
            folder = this.state.enemy
        }
        var total = Object.keys(folder).length;
        var img = folder[Object.keys(folder)[Math.floor(Math.random() * total)]];
        this.setState({index : index, img: img})
   }

  render() {
    return (
        <div>
            <h1>Forced Choice</h1>
            <img src={this.state.img} />
            <ButtonGroup>
              <Button onClick={this.friendlyButton}>
                Friendly
              </Button>
              <Button variant = "danger" onClick={this.enemyButton}>
                Enemy
              </Button>
            </ButtonGroup>
        </div>
    );
  }
}

export default Training;
