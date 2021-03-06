import React,{Component} from "react";
import {ScoresMethods} from "../../Helper Methods/Scores/ScoresMethods";
import './TopScores.css';

export class FinalScore extends Component{
    static displayName=FinalScore.name;
    constructor(props) {
        super(props)
        this.state= {
            date:''
        }
    }

    async componentDidMount() {
        let date= new Date().toISOString();
        await this.setState({date:date});
        await ScoresMethods.submitScore(this.props,this.state.date);
    }

    render(){
        return(
            <div className="customFinalScore ">
                <ul className="list-unstyled text-center">
                    <li className="m-1 p-2">
                        <h5>The quiz is finished.</h5>
                    </li>
                    <li className="m-1 p-2">
                        <h5>Your final score is {this.props.finalScore}</h5>
                    </li>
                </ul>
            </div>
        );
    }
}