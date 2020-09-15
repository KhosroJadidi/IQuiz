import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import {Encryption} from '../Helper Classes/Encryption';
//https://mdbootstrap.com/docs/react/forms/inputs/#docsTabsAPI

const applicationUrl = "http://localhost:53134";
const registrationRoute = "registration/register";
const loginRoute="token/getToken";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      email:"",
      password:"",
      loginAttempt:""
    }
    this.updateEmail=this.updateEmail.bind(this);
    this.updatePassword=this.updatePassword.bind(this);
    this.attemptRegistration=this.attemptRegistration.bind(this);
    this.handleRegistrationResponse=this.handleRegistrationResponse.bind(this);
    this.handleLoginResponse=this.handleLoginResponse.bind(this);
    this.attemptLogIn=this.attemptLogIn.bind(this);
  }

  updateEmail(input){
    let encryptedEmail= Encryption.encryptToBase64(input);
    this.setState({email:encryptedEmail})
  }

  updatePassword(input){
    let encryptedPassword=Encryption.encryptToBase64(input);
    this.setState({password:encryptedPassword})
  }

  attemptRegistration(){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({"email":this.state.email,"password":this.state.password});

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${applicationUrl}/${registrationRoute}`, requestOptions)
        .then(response => response.text())
        .then(result => this.handleRegistrationResponse(result))
        .catch(error => console.log('error', error));
  }

  handleRegistrationResponse(result){
    let jsonResult = JSON.parse(result);
    if (jsonResult.success) {
      this.attemptLogIn();
      window.navMenuFunctions.updateCurrentUser(jsonResult.email);
      window.navMenuFunctions.updateUserIsLoggedInStatus(true);
    } else if (!jsonResult.success) {
      this.setState({loginAttempt: jsonResult.message});
      window.navMenuFunctions.updateUserIsLoggedInStatus(false);
    }
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

    fetch(`${applicationUrl}/${loginRoute}`, requestOptions)
        .then(response => response.text())
        .then(result => this.handleLoginResponse(result))
        .catch(error => console.log('error', error));
  };

  handleLoginResponse(result) {
    let jsonResult = JSON.parse(result);
    if (jsonResult.success) {
      this.setState({loginAttempt: "Successfully logged in"});
      window.navMenuFunctions.updateCurrentUser(jsonResult.userinfo.email);
      window.navMenuFunctions.updateUserIsLoggedInStatus(true);
      this.props.props.history.push('/')
    } else if (!jsonResult.success) {
      this.setState({loginAttempt: jsonResult.message});
      window.navMenuFunctions.updateUserIsLoggedInStatus(false);
    }
  }

  render() {
    return(
        <MDBContainer className="m-1 p-2">
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h5 text-center mb-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                            success="right" autoComplete="on" getValue={this.updateEmail}/>
                  <MDBInput label="Your password" icon="lock" group type="password" validate autoComplete="on"
                            getValue={this.updatePassword}/>
                </div>
                <h6 className="text-center m-4 p-1">{this.state.loginAttempt}</h6>
                <div className="text-center">
                  <MDBBtn color="primary" onClick={this.attemptRegistration}>Register</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
    )
  }
}