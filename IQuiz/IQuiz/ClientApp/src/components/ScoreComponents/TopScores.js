import React, { Component } from "react";
import {ScoresMethods} from "../../Helper Methods/Scores/ScoresMethods";

export class TopScores extends Component {
  static displayName = TopScores.name;
  constructor(props) {
    super(props);
    this.state = {
      TopTenPlayers: []
    };
  }

  async componentDidMount() {
    await ScoresMethods.fetchTopScores(this);
  }



  render() {
    if(this.state.TopTenPlayers.__count===0){
      return (
        <div className="table-responsive table-striped">
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

    // return (
    //   <div className="table-responsive table-striped">
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th scope="col">Player Name</th>
    //           <th>Score</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {this.state.TopTenPlayers.map((player) => (
    //           <tr key={player.id}>
    //             <td>{player.user.email}</td>
    //             <td>{player.gainedPoints}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // );
  }
}
