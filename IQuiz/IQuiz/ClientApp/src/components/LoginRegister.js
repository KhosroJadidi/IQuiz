import React,{Component} from "react";
import {Login} from "./Login";
import {Register} from "./Register";

export class LoginRegister extends Component{
    static displayName=LoginRegister.name
    constructor(props){
        super(props);
        this.state={

        };
    }

    render(){
        return(
            <div>
                <Login props={this.props}></Login>
                <Register props={this.props}></Register>
            </div>
        );
    }
}