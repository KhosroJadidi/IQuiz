import React, { Component } from 'react';
import "./Home.css";
export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="container text-center">
                <h1 >Welcome to IQuiz!</h1>
                <br/>
                <h3 >Test your knowledge of geography, and see how you rank against other players!</h3>
            </div>
        );
    }
}