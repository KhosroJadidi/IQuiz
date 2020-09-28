//Fetch settings

import {ResponseHandlerMethods} from "../../Response Handlers/ResponseHandlerMethods";

const applicationUrl = "http://localhost:53134";
const submitScoreRoute = "Scores/submit";
const getTopScoresRoute="Scores/getTop"

export class ScoresMethods{
    static async submitScore(props,date){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${props.token}`);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({"email":`${props.user}`,"score":props.finalScore,"date":date});

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${applicationUrl}/${submitScoreRoute}`, requestOptions)
            .catch(error => console.log('error', error));
    }

    static async fetchTopScores(component){

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let response= await fetch(`${applicationUrl}/${getTopScoresRoute}`, requestOptions)
            .catch(error => console.log('error', error));
        await ResponseHandlerMethods.fetchTopScoresResponseHandler(response,component);
    }
}