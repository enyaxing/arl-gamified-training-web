import React, { Component } from "react";
import Options from "../components/option";

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
        </div>
    );
  }
}

export default Question;
