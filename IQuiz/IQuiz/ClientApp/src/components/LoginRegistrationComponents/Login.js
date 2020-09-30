import React from "react";
import {MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import {EncryptionMethods} from '../../Helper Methods/Encryption/EncryptionMethods';
import {LoginMethods} from '../../Helper Methods/User/LoginMethods';


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginAttempt: ""
        }
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.attemptLogIn = this.attemptLogIn.bind(this);
    }

    updateEmail = (input) => {
        let encryptedEmail = EncryptionMethods.encryptToBase64(input);
        this.setState({email: encryptedEmail});
    }

    updatePassword(input) {
        let encryptedPassword = EncryptionMethods.encryptToBase64(input);
        this.setState({password: encryptedPassword});
    }

    async attemptLogIn(){
        await LoginMethods.attemptLogIn(this);
    }

    //For a list of available events, see:
    //https://mdbootstrap.com/docs/react/forms/inputs/#docsTabsAPI
    render() {
        return (
            <MDBContainer className="m-1 p-2 ">
                <MDBRow>
                    <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">Sign in</p>
                            <div className="grey-text">
                                <MDBInput label="Type your email" icon="envelope" group type="email" validate
                                          error="wrong"
                                          success="right" autoComplete="on" getValue={this.updateEmail}/>
                                <MDBInput label="Type your password" icon="lock" group type="password" validate
                                          autoComplete="on" getValue={this.updatePassword}/>
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
