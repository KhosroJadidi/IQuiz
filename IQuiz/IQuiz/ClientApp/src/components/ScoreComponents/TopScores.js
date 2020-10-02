import React, { Component } from "react";
import {ScoresMethods} from "../../Helper Methods/Scores/ScoresMethods";
import './TopScores.css';

export class TopScores extends Component {
  static displayName = TopScores.name;
  constructor(props) {
    super(props);
    this.state = {
      TopTenPlayers: [],
      isLoading:true
    };
  }

  async componentDidMount() {
    await ScoresMethods.fetchTopScores(this);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.TopTenPlayers&&this.state.isLoading)
      this.setState({isLoading:false})
  }


  render() {
    if(this.state.isLoading){
      return (
          <div>
            <h1>Is Loading...</h1>
          </div>
      )
    }else{
      if(this.state.TopTenPlayers[0]){
        return (
            <div className="table-responsive table-striped customTopScore">
              <table className="table">
                <thead>
                <tr>
                  <th scope="col">Player Name</th>
                  <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {this.state.TopTenPlayers.map((player) => (
                    <tr key={player.id}>
                      <td>{player.user.email}</td>
                      <td>{player.gainedPoints}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        );
      }else{
        return(
            <div>
              <h4>No scores have been submitted yet!</h4>
            </div>
        )
      }
    }


  }




}