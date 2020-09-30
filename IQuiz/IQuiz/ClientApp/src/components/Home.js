import React, { Component } from 'react';
import "./Home.css";
export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="container text-center custom-landing-page">
                <h1 >Welcome to IQuiz!</h1>
                <br/>
                <h3 >Test your knowledge of geography!</h3>
                <br/>
                <h3>Compare your score against other players!</h3>
            </div>
        );
    }
}