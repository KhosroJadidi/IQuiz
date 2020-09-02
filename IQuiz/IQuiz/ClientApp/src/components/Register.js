import React from "react";
//https://mdbootstrap.com/docs/react/forms/inputs/#docsTabsAPI
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import {Encryption} from '../Helper Classes/Encryption';

export const Register = () => {

let email;
let password;


function UpdateEmail(input){
  email= Encryption.EncryptToBase64(input);
}

function UpdatePassword(input){
  password=Encryption.EncryptToBase64(input);
}

function AttemptAuthentication(){
  let requestOptions = {
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
        <p className="h5 text-center mb-4">Sign up</p>
        <div className="grey-text">
          <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
            success="right" autoComplete="on" getValue={UpdateEmail}/>
          <MDBInput label="Your password" icon="lock" group type="password" validate autoComplete="on" getValue={UpdatePassword}/>
        </div>
        <div className="text-center">
          <MDBBtn color="primary" onClick={AttemptAuthentication}>Register</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
};