import {ResponseHandlerMethods} from '../../Response Handlers/ResponseHandlerMethods';

//Fetch settings
const applicationUrl = "http://localhost:53134";
const loginRoute = "token/getToken";
const checkAuthCookiesRoute="Cookies/checkForAuthCookies";

export class  LoginMethods{
    static async attemptLogIn(component) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(
            {
                "Email": component.state.email,
                "Password": component.state.password
            });

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

    static async checkLoggedInStatus(component){
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let response= await fetch(`${applicationUrl}/${checkAuthCookiesRoute}`, requestOptions)
            .catch(error => console.log('error', error));

        await ResponseHandlerMethods.handleAuthCookiesCheckResponse(response,component);
    }
}