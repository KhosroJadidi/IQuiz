import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome To IQuiz!</h1>
        <h3>Take a Quiz and see how many correct answers you can get?</h3>
        <h4>More functionalities are under development, such as:</h4>
        <ol>
          <li>Login and authentication.(DONE!)</li>
          <li>Top Scores</li>
          <li>Admin level controls</li>
          <li>And perhaps even more...</li>
        </ol>
      </div>
    );
  }
}
