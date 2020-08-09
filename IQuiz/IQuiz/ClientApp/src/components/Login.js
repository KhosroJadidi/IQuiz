//https://mdbootstrap.com/docs/react/forms/inputs/#docsTabsAPI
import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

export const Login = () => {

let email;
let password;


function UpdateEmail(input){
  email=input;
}

function UpdatePassword(input){
  password=input;
}

function AttempAuthentication(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:53134/token/get", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

return (
<MDBContainer className="m-1 p-2">
  <MDBRow>
    <MDBCol md="6">
      <form>
        <p className="h5 text-center mb-4">Sign in</p>
        <div className="grey-text">
          <MDBInput  label="Type your email" icon="envelope" group type="email" validate error="wrong"
            success="right" autoComplete="on" getValue={UpdateEmail}/>
          <MDBInput  label="Type your password" icon="lock" group type="password" validate autoComplete="on" getValue={UpdatePassword}/>
        </div>
        <div className="text-center">
          <MDBBtn color="primary" onClick={AttempAuthentication}>Login</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
};