import {CookieHandlerMethods} from './CookieHandlerMethods';

export class ResponseHandlerMethods{
    static async  handleLoginResponse(response,component) {
        if (response.status===201){
            await handle201Response(response);
        }else if (response.status===204){
            await handle204Response(response);
        }else{
            console.log("Unhandled response from the server.")
        }

        async function handle201Response(response){
            let text= await response.text();
            let json= await JSON.parse(text);
            component.setState({loginAttempt: "Successfully logged in"});
                window.navMenuFunctions.updateCurrentUser(json.value.user.email);
                window.navMenuFunctions.updateUserIsLoggedInStatus(true);
                CookieHandlerMethods.deleteAuthCookies();
                CookieHandlerMethods.saveAuthCookies(json.value);
            component.props.props.history.push('/');
        }

        async function handle204Response(response){
            component.setState({loginAttempt: "Wrong login credentials"});
            window.navMenuFunctions.updateUserIsLoggedInStatus(false);
        }
    }
}