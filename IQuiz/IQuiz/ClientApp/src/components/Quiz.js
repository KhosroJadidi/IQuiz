import React, { Component } from 'react';
import {QuestionAndAnswerCard} from './QuestionAndAnswerCard';

export class Quiz extends Component {
    static displayName = Quiz.name;

    render() {
        return (
            <div align="center">
                <ul className="thumbnails list-unstyled row">
                    <li className="span4">
                        <QuestionAndAnswerCard></QuestionAndAnswerCard>
                    </li>
                    <li className="span4">
                        <QuestionAndAnswerCard></QuestionAndAnswerCard>
                    </li>
                    <li className="span4">
                        <QuestionAndAnswerCard></QuestionAndAnswerCard>
                    </li>
                    <li className="span4">
                        <QuestionAndAnswerCard></QuestionAndAnswerCard>
                    </li>
                    <li className="span4">
                        <QuestionAndAnswerCard></QuestionAndAnswerCard>
                    </li>
                    <li className="span4">
                        <QuestionAndAnswerCard></QuestionAndAnswerCard>
                    </li>
                </ul>
                <button className="btn-info m-1 p-2">Submit You Answers!</button>
            </div>
        );
    }
};