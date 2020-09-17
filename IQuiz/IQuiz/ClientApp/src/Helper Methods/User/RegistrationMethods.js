import {ResponseHandlerMethods} from "../Response Handlers/ResponseHandlerMethods";
//Fetch Settings
const applicationUrl="http://localhost:53134";
const registerRoute="User/register";

export class  RegistrationMethods{
    static async attemptRegistration(component){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(
            {
            "Email": component.state.email,
            "Password": component.state.password
            });

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response= await fetch(`${applicationUrl}/${registerRoute}`, requestOptions)
            .catch(error => console.log('error', error));

        await ResponseHandlerMethods.handleRegistrationResponse(response,component);
    }
}