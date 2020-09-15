import React, {Component} from "react";
import {QuestionCard} from "./QuestionCard";
import {FinalScore} from "./FinalScore";
import "../custom.css";

//Fetch settings
const applicationUrl = "http://localhost:53134";
const fetchQuestionRoute = "getQuestions";
const checkLoginRoute = "LoginStatus/checkLogin";
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
            token: ''
        };
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.getQuestionCard = this.getQuestionCard.bind(this);
        this.loadNextQuestionHandler = this.loadNextQuestionHandler.bind(this);
        this.finalScoreHandler = this.finalScoreHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.checkAuthCookie = this.checkAuthCookie.bind(this);
    };

    async componentDidMount() {
        let token = await this.checkAuthCookie();
        if (token)
            this.setState({token: token});
        let questions = await this.fetchQuestions();
        this.setState({fetchedData: questions});
    }

    async fetchQuestions() {
        let myHeaders = new Headers();
        await myHeaders.append("Authorization", `Bearer ${this.state.token}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let fetchedQA = await fetch(`${applicationUrl}/${fetchQuestionRoute}?quantity=5`, requestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error));
        return fetchedQA;
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

    checkAuthCookie() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let token = fetch(`${applicationUrl}/${checkLoginRoute}`, requestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then((json) => {
                if (json.value.token && json.value.user)
                    return json.value.token
                return;
            })
            .catch(error => console.log('error', error));
        return token;
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
                finalScore={this.state.currentScore}>
            </FinalScore>
        )
    }
}