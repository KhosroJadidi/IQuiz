import React, { Component } from "react";
import { QuestionCard } from "./QuestionCard";
import "../custom.css";

//Fetch settings
const applicationUrl = "http://localhost:53134";
const route = "questions";
const fetchQuantity = 5;
let currentQuestion = 0;

export class QuizSession extends Component {
    static displayName = QuizSession.name;
    constructor(props) {
        super(props);
        this.state = {
            fetchedData: []
        };
        this.FetchQuestions = this.FetchQuestions.bind(this);
        this.GetQuestionCard = this.GetQuestionCard.bind(this);
    };

    async FetchQuestions() {
        let fetchURI = `${applicationUrl}/${route}?quantity=${fetchQuantity}`;
        let fetchedQA = await fetch(fetchURI)
            .then((response) => response.json());
        return fetchedQA;
    }

    GetQuestionCard() {
        while (this.state.fetchedData.length !== 0) {
            return (
                <QuestionCard
                    id={this.state.fetchedData[currentQuestion].id}
                    imgUrl={this.state.fetchedData[currentQuestion].imageUrl}
                    question={this.state.fetchedData[currentQuestion].question}
                    answer_1={this.state.fetchedData[currentQuestion].answer_1}
                    answer_2={this.state.fetchedData[currentQuestion].answer_2}
                    answer_3={this.state.fetchedData[currentQuestion].answer_3}
                    answer_4={this.state.fetchedData[currentQuestion].answer_4}
                    correctAnswer={this.state.fetchedData[currentQuestion].correctAnswer}
                    points={this.state.fetchedData[currentQuestion].points}>
                </QuestionCard>
            );
        }
    }

    async componentDidMount() {
        let questions = await this.FetchQuestions();
        this.setState({ fetchedData: questions });
    }

    render() {
        return (
            <div align="center">
                <div>
                    {this.GetQuestionCard()}
                </div>
                <button
                    type="button"
                    className="btn-alert-info m-1 p-2">
                    Next Question</button>
            </div>
        );
    }
}
