import React, { Component } from "react";
import "../custom.css";

export class QuestionCard extends Component {
    static displayName = QuestionCard.name;
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false,
            givenAnswerIsCorrect: false
        };
        this.OnClickHandler = this.OnClickHandler.bind(this);
        this.GetCurrectAnswer = this.GetCurrectAnswer.bind(this);
    }

    async CheckAnswer(value) {
        let answerIsCorrect = this.props.correctAnswer === value;
        if (answerIsCorrect)
            await this.setState({ givenAnswerIsCorrect: true });
    }

    GetCurrectAnswer() {
        if (this.state.givenAnswerIsCorrect) {
            return (
                <h5 className="text-justify p-3" hidden={!this.state.isHidden}>
                    {`Correct Answer! You gained ${this.props.points} point(s).`}
                </h5>
            )
        }
        return (
            <h5 className="text-justify p-3" hidden={!this.state.isHidden}>
                {`The currect answer is ${this.props.correctAnswer}`}
            </h5>
        )
    }


    OnClickHandler(event) {
        this.setState({ isHidden: true });
        this.CheckAnswer(event.target.value);
    }
    render() {
        return (
            <div
                className="img-thumbnail img-fluid card-custome m-1 p-3 "
                align="center"
            >
                <img
                    src={this.props.imgUrl}
                    className="img-thumbnail img-custome"
                    alt=""
                ></img>
                <h5 className="text-justify p-3">{this.props.question}</h5>
                <ul className="list-unstyled" hidden={this.state.isHidden}>
                    <li className="m-1 p-2">
                        <button className="btn-info btn-custom" value={this.props.answer_1} onClick={this.OnClickHandler}>
                            {this.props.answer_1}
                        </button>
                    </li>
                    <li className="m-1 p-2">
                        <button className="btn-info btn-custom" value={this.props.answer_2} onClick={this.OnClickHandler}>
                            {this.props.answer_2}
                        </button>
                    </li>
                    <li className="m-1 p-2">
                        <button className="btn-info btn-custom" value={this.props.answer_3} onClick={this.OnClickHandler}>
                            {this.props.answer_3}
                        </button>
                    </li>
                    <li className="m-1 p-2">
                        <button className="btn-info btn-custom" value={this.props.answer_4} onClick={this.OnClickHandler}>
                            {this.props.answer_4}
                        </button>
                    </li>
                </ul>
                {this.GetCurrectAnswer()}
            </div>
        );
    }
}
