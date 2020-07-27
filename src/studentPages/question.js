import React, { Component } from "react";
import Options from "../components/option";
import { create, all } from 'mathjs'
import fire from "../config/Fire";

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
        count:0,
        values:[0,0,0,0,0,0,0,0,0,0,0]
    };
    this.questions = [
            "Compared to most people, are you typically unable to get what you want out of life?",
            "Growing up, would you ever “cross the line” by doing things that your parents would not tolerate?",
            "How often have you accomplished things that got you \"psyched\" to work even harder?",
            "Did you get on your parents’ nerves often when you were growing up?",
            "How often did you obey rules and regulations that were established by your parents?",
            "Growing up, did you ever act in ways that your parents thought were objectionable?",
            "Do you often do well at different things that you try?",
            "Not being careful enough has gotten me into trouble at times",
            "When it comes to achieving things that are important to me, I find that I don't perform as well as I ideally would like to do.",
            "I feel like I have made progress toward being successful in my life.",
            "I have found very few hobbies or activities in my life that capture my interest or motivate me to put effort into them."
            ];
    this.responses = [["never or seldom", "sometimes", "very often"],
                     ["never or seldom", "sometimes", "very often"],
                     ["never or seldom", "a few times", "many times"],
                     ["never or seldom", "sometimes", "very often"],
                     ["never or seldom", "sometimes", "always"],
                     ["never or seldom", "sometimes", "very often"],
                     ["never or seldom", "sometimes", "very often"],
                     ["never or seldom", "sometimes", "very often"],
                     ["never true", "sometimes true", "very often true"],
                     ["certainly false", " ", "certainly true"],
                     ["certainly false", " ", "certainly true"]
      ];
    this.changeValue = this.changeValue.bind(this);
    this.math = create(all);
  }

  setFocus = (userUID, focus) => {
    let db = fire.firestore().collection("users").doc(userUID);
    db.set({focus: focus}, {merge: true});
  }

  /** Calculates which regulatory focus type will be most beneficial to the user. Returns the type as either preventino, promotion, or neutral. */
  analyzeScore = () => {
    var answered = true;
    for (var i = 0; i < this.state.values.length; i++) {
        if (this.state.values[i] === 0) {
            answered = false
        }
    }
    if (answered) {
        let initialScores = this.calculateScore();
        let scores = this.calculateIntervals(initialScores[0], initialScores[1]);

        let promotion = scores[0][0];
        let prevention = scores[1][0];
        let control = scores[2][0];

        let maxVal = Math.max(prevention, promotion, control);
        var selected = "";
        if  (maxVal === prevention) {
          selected = "prevention";
        } else if (maxVal === promotion) {
          selected = "promotion";
        } else {
          selected = "neutral";
        }
        console.log(initialScores);
        console.log(selected);
        this.setFocus(this.props.user.uid, selected);
        alert("Answers successfully submitted.  You are " + selected + " oriented.")
    } else {
        alert("Please answer all questions before submitting.")
    }
  }

      /** Heuristic from Dr. Benjamin Files. Modified from Python to Swift.
              Outputs: Prevention score, promotion score, confidence interval array*/
  calculateScore = () => {
      /** Response for prevention: 1.0, promotion: 5.0 score: [5, 1, 1, 1, 5, 1, 1, 1, 5, 1, 5]*/
      /** Response for prevention: 5.0, promotion: 1.0 score: [1, 5, 5, 5, 1, 5, 5, 5, 1, 5, 1]*/
      /** score[0] = pre, score[1] = pro*/
      var score = [];

      let r1 = parseFloat(this.state.values[0]);
      let r2 = parseFloat(this.state.values[1]);
      let r3 = parseFloat(this.state.values[2]);
      let r4 = parseFloat(this.state.values[3]);
      let r5 = parseFloat(this.state.values[4]);
      let r6 = parseFloat(this.state.values[5]);
      let r7 = parseFloat(this.state.values[6]);
      let r8 = parseFloat(this.state.values[7]);
      let r9 = parseFloat(this.state.values[8]);
      let r10 = parseFloat(this.state.values[9]);
      let r11 = parseFloat(this.state.values[10]);

      let pre_part1 = (6 - r1) + r3 + r7;
      let pre_part2 = (6 - r9) + r10 + (6 - r11);
      score.push((pre_part1 + pre_part2) / 6);

      let pro_part1 = (6 - r2) + (6 - r4) + r5;
      let pro_part2 = (6 - r6) + (6 - r8);
      score.push((pro_part1 + pro_part2) / 5);
      return score;
  }

  /** Adpated from Dr. Files, calculates confidence intervals given user questionnaire responses. */
  calculateIntervals = (pre, pro) => {
      var math = this.math
      let B = math.matrix([[1.565563, -0.502494, -0.112472, -6.720915, -2.630483, 1.413550, 0.676953, 0.641702, 0.282040]]);
      let T = 0.677422;

      let MSE = 0.953010;

      let iCovX = math.matrix([
      [    0.8873,   -0.0740,   -0.1814,   -0.8873,   -0.8873,    0.0740,    0.1814,    0.0740,    0.1814],
      [   -0.0740,    0.0494,   -0.0166,    0.0740,    0.0740,   -0.0494,    0.0166,   -0.0494,    0.0166],
      [   -0.1814,   -0.0166,    0.0627,    0.1814,    0.1814,    0.0166,   -0.0627,    0.0166,   -0.0627],
      [   -0.8873,    0.0740,    0.1814,    3.9430,    0.8873,   -0.3611,   -0.7339,   -0.0740,   -0.1814],
      [   -0.8873,    0.0740,    0.1814,    0.8873,    2.7615,   -0.0740,   -0.1814,   -0.3327,   -0.4982],
      [    0.0740,   -0.0494,    0.0166,   -0.3611,   -0.0740,    0.1104,    0.0048,    0.0494,   -0.0166],
      [    0.1814,    0.0166,   -0.0627,   -0.7339,   -0.1814,    0.0048,    0.1923,   -0.0166,    0.0627],
      [    0.0740,   -0.0494,    0.0166,   -0.0740,   -0.3327,    0.0494,   -0.0166,    0.1119,    0.0068],
      [    0.1814,   0.0166 ,   -0.0627,   -0.1814,   -0.4982,   -0.0166,    0.0627,    0.0068,    0.1342 ]]);

      var scores = [
          [0.0, 0.0, 0.0],
          [0.0, 0.0, 0.0],
          [0.0, 0.0, 0.0]];

//        gain case 1
      let X0 = math.matrix([[1, pre, pro, 0, 1, 0, 0, pre, pro]]);
      let temp1 = math.multiply(math.multiply(X0, iCovX), math.transpose(X0));
      let temp2 = T * Math.sqrt(MSE * (1 + temp1.subset(math.index(0,0))));
      scores[0][0] = math.multiply(B, math.transpose(X0)).subset(math.index(0,0));
      scores[0][1] = scores[0][0] - temp2;
      scores[0][2] = scores[0][0] + temp2;

//        loss case 2
      let X1 = math.matrix([[ 1, pre, pro, 1, 0, pre, pro, 0, 0]]);
      let temp3 = math.multiply(math.multiply(X1, iCovX), math.transpose(X1));
      let temp4 = T * Math.sqrt(MSE * (1 + temp3.subset(math.index(0,0))));
      scores[1][0] = math.multiply(B, math.transpose(X1)).subset(math.index(0,0));
      scores[1][1] = scores[1][0] - temp4;
      scores[1][2] = scores [1][0] + temp4;

//        control case 3
      let X2 = math.matrix([[1, pre, pro, 0, 0, 0, 0, 0, 0]])
      let temp5 = math.multiply(math.multiply(X2, iCovX), math.transpose(X2));
      let temp6 = T * Math.sqrt(MSE * (1 + temp5.subset(math.index(0,0))));
      scores[2][0] = math.multiply(B, math.transpose(X2)).subset(math.index(0,0));
      scores[2][1] = scores[2][0] - temp6;
      scores[2][2] = scores [2][0] + temp6;

      return scores
  }


  changeValue = (event, key) => {
      var temp = this.state.values
      temp[key] = event.target.value
      this.setState({values:temp});
      console.log(temp)
    };

  render() {
    var info = [];
    for (var i = 0; i < this.questions.length; i++) {
        info.push(<Options key = {i}
                    number = {i}
                    question = {this.questions[i]}
                    responses = {this.responses[i]}
                    value = {this.state.values[i]}
                    changeValue = {this.changeValue}/>);
    }
    return (
        <div>
            {info}
            <button onClick={this.analyzeScore}>
              Submit
            </button>
        </div>
    );
  }
}

export default Question;
