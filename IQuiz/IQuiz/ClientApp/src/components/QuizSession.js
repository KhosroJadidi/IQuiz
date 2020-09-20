import React, {Component} from "react";
import {QuestionCard} from "./QuestionCard";
import {FinalScore} from "./FinalScore";
import "../custom.css";
import {LoginMethods} from "../Helper Methods/User/LoginMethods";
import {QuestionAndAnswerMethods} from "../Helper Methods/QuestionsAndAnswers/QuestionAndAnswerMethods";

//This variable determines the number of questions asked per session.
const fetchQuantity = 5;

export class QuizSession extends Component {
    static displayName = QuizSession.name;

    constructor(props) {
        super(props);
        this.state = {
            fetchedData: [],
            currentQuestion: 0,
            currentScore: 0,
            quizIsDone: false,
            token:'',
            user: '',
            userIsLoggedIn:false,
            currentUserName:''
        };
        this.getQuestionCard = this.getQuestionCard.bind(this);
        this.loadNextQuestionHandler = this.loadNextQuestionHandler.bind(this);
        this.finalScoreHandler = this.finalScoreHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    };

    async componentDidMount() {
        await LoginMethods.checkLoggedInStatus(this);
        await QuestionAndAnswerMethods.fetchQuestions(this,fetchQuantity);
    }

    async loadNextQuestionHandler() {
        await this.setState(
            (prevState) => ({
                currentQuestion: prevState.currentQuestion + 1
            })
        );
    }

    finalScoreHandler() {
        this.setState({quizIsDone: true});
    }

    UpdateScore(points = 1) {

        this.setState(
            (prevState) => ({
                currentScore: prevState.currentScore + points
            })
        );

    }

    onClickHandler() {
        if (this.state.currentQuestion < fetchQuantity - 1) {
            this.loadNextQuestionHandler();
        } else {
            this.finalScoreHandler();
        }
    }

    render() {
        if (!this.state.quizIsDone) {
            return (
                <div align="center">
                    <h2>Current Score: {this.state.currentScore}</h2>
                    <div>
                        {this.getQuestionCard()}
                    </div>
                    <button
                        type="button"
                        className="btn-alert-info m-1 p-2 btn-custom"
                        onClick={this.onClickHandler}>
                        {(this.state.currentQuestion < fetchQuantity - 1)
                            ? 'Next Question'
                            : 'Finish Quiz'}
                    </button>
                </div>
            );
        }
        return (
            <FinalScore
                finalScore={this.state.currentScore}
                token={this.state.token}>
            </FinalScore>
        )
    }

    getQuestionCard() {
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
}