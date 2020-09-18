import {QuestionCard} from "../../components/QuestionCard";
import React from "react";
import {ResponseHandlerMethods} from "../Response Handlers/ResponseHandlerMethods";


//Fetch settings
const applicationUrl = "http://localhost:53134";
const fetchQuestionRoute = "getQuestions";

export class QuestionAndAnswerMethods{

    static async fetchQuestions(component) {
        let myHeaders = new Headers();
        await myHeaders.append("Authorization", `Bearer ${component.state.token}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let response = await fetch(`${applicationUrl}/${fetchQuestionRoute}?quantity=5`, requestOptions)
            .catch(error => console.log('error', error));
        await ResponseHandlerMethods.fetchQuestionsResponseHandler(response,component);
    }


    static async getQuestionCard(component) {
        if (component.state.fetchedData.length !== 0) {
            return (
                <QuestionCard
                    id={component.state.fetchedData[component.state.currentQuestion].id}
                    imgUrl={component.state.fetchedData[component.state.currentQuestion].imageUrl}
                    question={component.state.fetchedData[component.state.currentQuestion].question}
                    answer_1={component.state.fetchedData[component.state.currentQuestion].answer_1}
                    answer_2={component.state.fetchedData[component.state.currentQuestion].answer_2}
                    answer_3={component.state.fetchedData[component.state.currentQuestion].answer_3}
                    answer_4={component.state.fetchedData[component.state.currentQuestion].answer_4}
                    correctAnswer={component.state.fetchedData[component.state.currentQuestion].correctAnswer}
                    points={component.state.fetchedData[component.state.currentQuestion].points}
                    gainPoint={component.UpdateScore.bind(component)}>
                </QuestionCard>
            );
        }
    }


}