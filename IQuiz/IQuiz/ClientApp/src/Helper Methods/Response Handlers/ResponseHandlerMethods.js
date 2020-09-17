import {CookieHandlerMethods} from '../Cookie/CookieHandlerMethods';
import {LoginMethods} from "../User/LoginMethods";

export class ResponseHandlerMethods{
    static async  handleLoginResponse(response,component) {
        if (response.status===201){
            await handle201LoginResponse(response);
        }else if (response.status===204){
            await handle204LoginResponse(response);
        }else{
            console.log("Unhandled response from the server.")
            console.log(response)
        }

        async function handle201LoginResponse(response){
            let text= await response.text();
            let json= await JSON.parse(text);
            component.setState({loginAttempt: "Successfully logged in"});
                window.navMenuFunctions.updateCurrentUser(json.value.user.email);
                window.navMenuFunctions.updateUserIsLoggedInStatus(true);
                CookieHandlerMethods.deleteAuthCookies();
                CookieHandlerMethods.saveAuthCookies(json.value);
            component.props.props.history.push('/');
        }

        async function handle204LoginResponse(){
            component.setState({loginAttempt: "Wrong login credentials"});
            window.navMenuFunctions.updateUserIsLoggedInStatus(false);
        }
    }

    static async handleRegistrationResponse(response,component){
        if (response.status===201){
            await handle201RegistrationResponse(response);
        }else if (response.status===204){
            await handle204RegistrationResponse(response);
        }else{
            console.log("Unhandled response from the server.")
        }

        async function handle201RegistrationResponse(response){

            let text= await response.text();
            let json= await JSON.parse(text);

            console.log(json.value);
            await LoginMethods.attemptLogIn(component);
            window.navMenuFunctions.updateCurrentUser(json.value.email);
            window.navMenuFunctions.updateUserIsLoggedInStatus(true);
        }

        async function handle204RegistrationResponse(){
            console.log("handle204RegistrationResponse was invoked");
            console.log(response);
        }
    }

    static async handleAuthCookiesCheckResponse(response,component){
        if (response.status===200){
            await handle200AuthCookiesCheckResponse(response);
        }else if (response.status===404){
            await handle204AuthCookiesCheckResponse(response);
        }else{
            console.log("Unhandled response from the server.")
        }

        async function handle200AuthCookiesCheckResponse(response) {
            let text= await response.text();
            let json= await JSON.parse(text);
            component.setState({
                token: json.value.token,
                user: json.value.email,
                userIsLoggedIn:true,
                currentUserName:json.value.email
            });
        }

        async function handle204AuthCookiesCheckResponse(response) {
            component.setState({
                token: "",
                user: "",
                userIsLoggedIn:true
            });
        }

    }
}