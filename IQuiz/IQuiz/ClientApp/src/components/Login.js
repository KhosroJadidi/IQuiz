import React from "react";
import {MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import {Encryption} from '../Helper Classes/Encryption';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginAttempt: ""
        }
        this.UpdateEmail = this.UpdateEmail.bind(this);
        this.UpdatePassword = this.UpdatePassword.bind(this);
        this.HandleLoginResponse = this.HandleLoginResponse.bind(this);
        this.attemptLogIn = this.attemptLogIn.bind(this);
    }

    UpdateEmail = (input) => {
        let EncryptedEmail = Encryption.EncryptToBase64(input);
        this.setState({email: EncryptedEmail});
    }

    UpdatePassword(input) {
        let EncryptedPassword = Encryption.EncryptToBase64(input);
        this.setState({password: EncryptedPassword});
    }

    attemptLogIn() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({"Email": this.state.email, "Password": this.state.password});

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:53134/token/get", requestOptions)
            .then(response => response.text())
            .then(result => this.HandleLoginResponse(result))
            .catch(error => console.log('error', error));
    };

    HandleLoginResponse(result) {
        let jsonResult = JSON.parse(result);
        if (jsonResult.success) {
            this.setState({loginAttempt: "Successfully logged in"});
            window.navMenuFunctions.updateCurrentUser(jsonResult.userinfo.email);
            window.navMenuFunctions.updateUserIsLoggedInStatus(true);
            window.appFunctions.updateLoggedInStatus(true);
            window.appFunctions.updateToken(jsonResult.token);
            this.props.props.history.push('/')
        } else if (!jsonResult.success) {
            this.setState({loginAttempt: jsonResult.message});
            window.appFunctions.updateLoggedInStatus(false);
            window.navMenuFunctions.updateUserIsLoggedInStatus(false);
        }
    }

    //For a list of available event, see:
    //https://mdbootstrap.com/docs/react/forms/inputs/#docsTabsAPI
    render() {
        return (
            <MDBContainer className="m-1 p-2">
                <MDBRow>
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">Sign in</p>
                            <div className="grey-text">
                                <MDBInput label="Type your email" icon="envelope" group type="email" validate
                                          error="wrong"
                                          success="right" autoComplete="on" getValue={this.UpdateEmail}/>
                                <MDBInput label="Type your password" icon="lock" group type="password" validate
                                          autoComplete="on" getValue={this.UpdatePassword}/>
                            </div>
                            <h6 className="text-center m-4 p-1">{this.state.loginAttempt}</h6>
                            <div className="text-center">
                                <MDBBtn color="primary" onClick={this.attemptLogIn}>Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
