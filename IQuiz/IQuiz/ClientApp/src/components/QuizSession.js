import React, { Component } from "react";
import { QuestionCard } from "./QuestionCard";
import "../custom.css";
import { createUnionOrIntersectionTypeNode } from "typescript";

//Fetch settings
const applicationUrl = "http://localhost:53134";
const route = "questions";
const fetchQuantity = 5;

export class QuizSession extends Component {
    static displayName = QuizSession.name;
    constructor(props) {
        super(props);
        this.state = {
            fetchedData: [],
            currentQuestion: 0,
            currentScore: 0
        };
        this.FetchQuestions = this.FetchQuestions.bind(this);
        this.GetQuestionCard = this.GetQuestionCard.bind(this);
        this.LoadNextQuestionHandler = this.LoadNextQuestionHandler.bind(this);
        this.FinalScoreHandler = this.FinalScoreHandler.bind(this);
        this.onClickHandler=this.onClickHandler.bind(this);
    };

    async FetchQuestions() {
        let fetchURI = `${applicationUrl}/${route}?quantity=${fetchQuantity}`;
        let fetchedQA = await fetch(fetchURI)
            .then((response) => response.json());
        return fetchedQA;
    }

    GetQuestionCard() {
        if (this.state.fetchedData.length !== 0) {
            return (
                <QuestionCard
                    id={this.state.fetchedData[this.state.currentQuestion].id}
                    imgUrl={this.state.fetchedData[this.state.currentQuestion].imageUrl}
                    question={this.state.fetchedData[this.state.currentQuestion].question}
                    answer_1={this.state.fetchedData[this.state.currentQuestion].answer_1}
                    answer_2={this.state.fetchedData[this.state.currentQuestion].answer_2}
                    answer_3={this.state.fetchedData[this.state.currentQuestion].answer_3}
                    answer_4={this.state.fetchedData[this.state.currentQuestion].answer_4}
                    correctAnswer={this.state.fetchedData[this.state.currentQuestion].correctAnswer}
                    points={this.state.fetchedData[this.state.currentQuestion].points}
                    gainPoint={this.UpdateScore.bind(this)}>
                </QuestionCard>
            );
        }
    }

    async LoadNextQuestionHandler() {
        await this.setState(
            (prevState) => ({
                currentQuestion: prevState.currentQuestion + 1
            })
        );
    }

    FinalScoreHandler() {
        console.log('FinalScoreHandler was clicked!');

    }

    async componentDidMount() {
        let questions = await this.FetchQuestions();
        this.setState({ fetchedData: questions });
    }

    UpdateScore(points = 1) {

        this.setState(
            (prevState) => ({
                currentScore: prevState.currentScore + points
            })
        );

    }

    onClickHandler(){
        if (this.state.currentQuestion < fetchQuantity - 1){
            this.LoadNextQuestionHandler();
        }else{
            this.FinalScoreHandler();
        }
    }

    render() {
        return (
            <div align="center">
                <h2>Current Score: {this.state.currentScore}</h2>
                <div>
                    {this.GetQuestionCard()}
                </div>
                <button
                    type="button"
                    className="btn-alert-info m-1 p-2 btn-custom"
                    onClick={this.onClickHandler}>
                    {(this.state.currentQuestion < fetchQuantity - 1)
                        ? 'Next Question'
                        : 'Finish Quiz'}</button>
            </div>
        );
    }
}
