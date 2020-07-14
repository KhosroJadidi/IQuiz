import React, { Component } from "react";
import { QuestionAndAnswerCard } from "./QuestionAndAnswerCard";
import "../custom.css";

//Fetch settings
const applicationUrl = "http://localhost:53134";
const route = "questions";
const fetchQuantity = 6;

export class Quiz extends Component {
  static displayName = Quiz.name;
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: []
    };
    this.FetchQuestionsAndAnswers = this.FetchQuestionsAndAnswers.bind(this);
  }

  async FetchQuestionsAndAnswers() {
    let fetchURI = `${applicationUrl}/${route}?quantity=${fetchQuantity}`;
    let fetchQA = await fetch(fetchURI).then((response) => response.json());
    return fetchQA;
  }

  async componentDidMount() {
    let questionsAndAnswers = await this.FetchQuestionsAndAnswers();
    this.setState({ fetchedData: questionsAndAnswers });
  }

  render() {
    return (
      <div align="center">
        <div>
          <ul className="thumbnails list-unstyled row">
            {this.state.fetchedData.map((qa) => (
              <li key={qa.id}>
                <QuestionAndAnswerCard
                  id={qa.id}
                  question={qa.question}
                  answer={qa.answer}
                ></QuestionAndAnswerCard>
              </li>
            ))}
          </ul>
        </div>
        <button className="btn-info m-1 p-2">Submit You Answers!</button>
      </div>
    );
  }
}
