import React,{Component} from "react";

export class FinalScore extends Component{
    static displayName=FinalScore.name;


    render(){
        return(
            <div>
                <ul className="list-unstyled">
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