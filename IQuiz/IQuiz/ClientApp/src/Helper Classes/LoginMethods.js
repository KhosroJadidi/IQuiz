import {ResponseHandlerMethods} from './ResponseHandlerMethods';

//Fetch settings
const applicationUrl = "http://localhost:53134";
const loginRoute = "token/getToken";

export class  LoginMethods{
    static async attemptLogIn(email,password,component) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({"Email": email, "Password": password});

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response=await fetch(`${applicationUrl}/${loginRoute}`, requestOptions)
            .catch(error => console.log('error', error));
        await ResponseHandlerMethods.handleLoginResponse(response,component);
    };
}