import {CookieHandlerMethods} from '../Helper Methods/Cookie Handlers/CookieHandlerMethods';
import {LoginMethods} from "../Helper Methods/User/LoginMethods";

export class ResponseHandlerMethods{
    static async handleLoginResponse(response,component) {
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
            console.log("Unhandled response from the server.");
            console.log(response);
        }

        async function handle201RegistrationResponse(response){

            let text= await response.text();
            let json= await JSON.parse(text);

            await LoginMethods.attemptLogIn(component);
            window.navMenuFunctions.updateCurrentUser(json.value.email);
            window.navMenuFunctions.updateUserIsLoggedInStatus(true);
        }

        async function handle204RegistrationResponse(){
            component.setState({loginAttempt:"This Email Is Already Registered!"});
        }
    }

    static async handleAuthCookiesCheckResponse(response,component){
        if (response.status===200){
            await handle200AuthCookiesCheckResponse(response);
        }else if (response.status===404){
            await handle204AuthCookiesCheckResponse(response);
        }else{
            console.log("Unhandled response from the server.");
            console.log(response);
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

        async function handle204AuthCookiesCheckResponse() {
            component.setState({
                token: "",
                user: "",
                userIsLoggedIn:false,
                currentUserName:'Login/Register'
            });
        }
    }

    static async handleLogOutResponse(response,component){

        if (response.status===204){
            await handle204LogOutResponse(response);
        }else if (response.status===404){
            await handle404LogOutResponse(response);
        }else{
            console.log("Unhandled response from the server.");
            console.log(response);
        }

        async function handle204LogOutResponse(response) {
            component.setState({
                token:'',
                user:'',
                userIsLoggedIn: false,
                currentUserName: 'Login/Register'
            });
        }

        async function handle404LogOutResponse(response) {
            console.log("The following authentication cookies were not found or deleted:");
            console.log(response);
        }
    }

    static async fetchQuestionsResponseHandler(response,component){

        if (response.status===200){
            await handle200fetchQuestionsResponse(response);
        }else if (response.status===404){
            await handle404fetchQuestionsResponse(response);
        }else{
            console.log("Unhandled response from the server.");
            console.log(response);
        }

        async function handle200fetchQuestionsResponse(response) {
            let json = await response.text()
                .then(text => JSON.parse(text));
            component.setState({fetchedData: json.value});
        }

        async function handle404fetchQuestionsResponse(response) {
            console.log("No questions were returned from the database.");
            console.log(response);
        }
    }

    static async fetchTopScoresResponseHandler(response,component){
        if (response.status===200){
            await handle200fetchTopScoresResponse(response);
        }else if (response.status===404){
            await handle404fetchTopScoresResponse(response);
        }else{
            console.log("Unhandled response from the server.");
            console.log(response);
        }

        async function handle200fetchTopScoresResponse(response){
            let text= await response.text();
            let json= await JSON.parse(text);
            component.setState({TopTenPlayers:json.value})
        }

        async function handle404fetchTopScoresResponse(response){
            component.setState({TopTenPlayers:[]});
            console.log("No scores were returned from the database.");
            console.log(response);
        }
    }
}