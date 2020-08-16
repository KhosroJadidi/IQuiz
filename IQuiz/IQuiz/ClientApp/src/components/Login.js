import React from "react";
//https://mdbootstrap.com/docs/react/forms/inputs/#docsTabsAPI
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import {Encryption} from '../Helper Classes/Encryption';


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      email:"",
      password:"",
      loginAttempt:""
    }
    this.UpdateEmail=this.UpdateEmail.bind(this);
    this.UpdatePassword=this.UpdatePassword.bind(this);
    this.HandleLoginResponse=this.HandleLoginResponse.bind(this);
    this.AttemptAuthentication=this.AttemptAuthentication.bind(this);
  }

  UpdateEmail=(input)=>{
    let EncryptedEmail= Encryption.EncryptToBase64(input);
    this.setState({email:EncryptedEmail});
  }

  UpdatePassword(input){
    let EncryptedPassword=Encryption.EncryptToBase64(input);
    this.setState({password:EncryptedPassword});
  }

  AttemptAuthentication(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"Email":this.state.email,"Password":this.state.password});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:53134/token/get", requestOptions)
      .then(response => response.text())
      .then(result =>this.HandleLoginResponse(result))    
      .catch(error => console.log('error', error));

  };

  HandleLoginResponse(result){
    let jsonResult= JSON.parse(result);
    if(jsonResult.success){
      this.setState({loginAttempt:"Successfully logged in"});
      setTimeout(()=>{this.props.props.history.push('/')},1500);
    }
    else if(!jsonResult.success){
      this.setState({loginAttempt:jsonResult.message});
    }
  }

  render(){
     return (
    <MDBContainer className="m-1 p-2">
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput  label="Type your email" icon="envelope" group type="email" validate error="wrong"
                success="right" autoComplete="on" getValue={this.UpdateEmail}/>
              <MDBInput  label="Type your password" icon="lock" group type="password" validate autoComplete="on" getValue={this.UpdatePassword}/>
            </div>
            <h6 className="text-center m-4 p-1">{this.state.loginAttempt}</h6>
            <div className="text-center">
              <MDBBtn color="primary" onClick={this.AttemptAuthentication}>Login</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    );
  }
  }
