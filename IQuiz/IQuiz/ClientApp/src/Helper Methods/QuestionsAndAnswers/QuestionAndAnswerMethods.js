import {QuestionCard} from "../../components/QuestionAnswerComponents/QuestionCard";
import React from "react";
import {ResponseHandlerMethods} from "../../Response Handlers/ResponseHandlerMethods";


//Fetch settings
const applicationUrl = "http://localhost:53134";
const fetchQuestionRoute = "QuestionAndAnswers/getQuestionsAndAnswers";

export class QuestionAndAnswerMethods{

    static async fetchQuestions(component,fetchQuantity) {
        let myHeaders = new Headers();
        await myHeaders.append("Authorization", `Bearer ${component.state.token}`);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let response = await fetch(`${applicationUrl}/${fetchQuestionRoute}?quantity=${fetchQuantity}`, requestOptions)
            .catch(error => console.log('error', error));
        await ResponseHandlerMethods.fetchQuestionsResponseHandler(response,component);
    }
}