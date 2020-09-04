// import React, { Component } from "react";
// import { QuestionAndAnswerCard } from "./QuestionAndAnswerCard";
// import "../custom.css";
//
// //Fetch settings
// const applicationUrl = "http://localhost:53134";
// const route = "questions";
// const fetchQuantity = 5;
//
// export class Quiz extends Component {
//   static displayName = Quiz.name;
//   constructor(props) {
//     super(props);
//     this.state = {
//       fetchedData: [],
//       fetchedRefs: []
//     };
//     this.FetchQuestionsAndAnswers = this.FetchQuestionsAndAnswers.bind(this);
//   }
//
//   async FetchQuestionsAndAnswers() {
//     let fetchURI = `${applicationUrl}/${route}?quantity=${fetchQuantity}`;
//     let fetchQA = await fetch(fetchURI).then((response) => response.json());
//     return fetchQA;
//   }
//
//   async componentDidMount() {
//     let questionsAndAnswers = await this.FetchQuestionsAndAnswers();
//     this.setState({ fetchedData: questionsAndAnswers });
//   }
//
//   mapRefsAndReturnListItem(qa) {
//     this.state.fetchedRefs.push(qa.id);
//     return (
//       <li key={qa.id}>
//         <QuestionAndAnswerCard
//           ref={qa.id}
//           id={qa.id}
//           question={qa.question}
//           answer={qa.answer}
//         />
//       </li>
//     );
//   }
//
//   handleClick = () => {
//     this.state.fetchedRefs.map((ref) => {
//       this.refs[ref].checkAnswer();
//       return'';
//     });
//   };
//   render() {
//     return (
//       <div align="center">
//         <div>
//           <ul className="thumbnails list-unstyled row">
//             {this.state.fetchedData.map((qa) => this.mapRefsAndReturnListItem(qa))}
//           </ul>
//         </div>
//         <button
//           type="button"
//           className="btn-info m-1 p-2"
//           onClick={this.handleClick}
//         >
//           Submit Your Answers!
//         </button>
//       </div>
//     );
//   }
// }
