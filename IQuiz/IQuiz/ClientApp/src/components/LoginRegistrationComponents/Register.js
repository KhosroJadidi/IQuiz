import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import {EncryptionMethods} from '../../Helper Methods/Encryption/EncryptionMethods';
import {RegistrationMethods} from "../../Helper Methods/User/RegistrationMethods";
//https://mdbootstrap.com/docs/react/forms/inputs/#docsTabsAPI

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
  }

  updateEmail(input){
    let encryptedEmail= EncryptionMethods.encryptToBase64(input);
    this.setState({email:encryptedEmail})
  }

  updatePassword(input){
    let encryptedPassword=EncryptionMethods.encryptToBase64(input);
    this.setState({password:encryptedPassword})
  }

  async attemptRegistration(){
    await RegistrationMethods.attemptRegistration(this);
  }

  render() {
    return(
        <MDBContainer className="m-1 p-2 ">
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