import React, { Component } from "react";
import "../custom.css";

export class QuestionAndAnswerCard extends Component {
  static displayName = QuestionAndAnswerCard.name;

  checkAnswer() {
    let givenAnswer = document.getElementById(this.props.id).value.toString().toLowerCase();
    let answer = this.props.answer.toString().toLowerCase();
    givenAnswer === answer
      ? console.log(`Currect Answer.Given Answer: ${givenAnswer}`)
      : console.log(
          `Wrong Answer.Given Answer: ${givenAnswer}.
          Currect Answer is: ${this.props.answer}`
        );
  }

  render() {
    return (
      <div
        className="img-thumbnail img-fluid card-custome m-1 p-3 "
        align="center"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Flag_of_Albany%2C_New_York.svg"
          className="img-thumbnail img-custome"
          alt=""
        ></img>
        <h5 className="text-justify p-3">{this.props.question}</h5>
        <input id={this.props.id} type="text"></input>
      </div>
    );
  }
}
