import React, { Component } from 'react';
import "./Home.css";
export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.handleRegisterClick=this.handleRegisterClick.bind(this);
        this.handleTopTenClick=this.handleTopTenClick.bind(this);
    }

    handleRegisterClick(){
    console.log(this)
    this.props.history.push('/login');
}

    handleTopTenClick(){
        console.log(this)
        this.props.history.push('/top');
    }

    render () {
        return (
            <div className="container text-center custom-padding">
                <h1 className="custom-padding">Welcome to IQuiz!</h1>
                <br/>
                <h3 className="custom-padding">Test your knowledge of geography, and see how you rank against other players!</h3>
                <div className="row justify-content-center">
                    <button className="btn-info custom-margin" onClick={this.handleRegisterClick}>Register!</button>
                    <br/>
                    <button className="btn-danger custom-margin" onClick={this.handleTopTenClick}>Top Scores!</button>
                </div>
            </div>
        );
    }
}