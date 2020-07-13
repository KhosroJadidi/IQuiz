import React, { Component } from "react";
import '../custom.css'

export class QuestionAndAnswerCard extends Component {
  static displayName = QuestionAndAnswerCard.name;

  render() {
    return (
      <div className="img-thumbnail img-fluid card-custome m-1 p-3 " align="center">
        <img src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
            className="img-thumbnail img-custome"
            alt=""></img>
        <h5 className="text-justify p-3">
            Ipsum consequat dolore esse proident. Sit tempor veniam labore culpa ullamco dolor quis. Officia officia nulla non magna fugiat dolor aliquip velit veniam adipisicing ut fugiat sit qui.
        </h5>
        <input type="text"></input>
      </div>
    );
  }
}
