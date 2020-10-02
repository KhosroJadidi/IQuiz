//Fetch settings
import {ResponseHandlerMethods} from "../../Response Handlers/ResponseHandlerMethods";

const applicationUrl = "http://localhost:53134";
const loginRoute = "Cookies/deleteAuthCookies";

export class LogoutMethods{
    static async attemptLogOut(component){
        let raw = "";

        let requestOptions = {
            method: 'DELETE',
            body: raw,
            redirect: 'follow'
        };

        let response= await fetch(`${applicationUrl}/${loginRoute}`, requestOptions)
            .catch(error => console.log('error', error));

        await ResponseHandlerMethods.handleLogOutResponse(response,component);
    }
}