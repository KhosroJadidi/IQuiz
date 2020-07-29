import React, { Component } from "react";

export class TopScores extends Component {
  static displayName = TopScores.name;
  constructor(props) {
    super(props);
    this.state = {
      TopTenPlayers: [],
    };
  }

  componentDidMount() {
    this.setState({
      TopTenPlayers: [
        { key: 1, playerName: "khosi", score: 9 },
        { key: 2, playerName: "soli", score: 6 },
        { key: 3, playerName: "john", score: 7 },
        { key: 4, playerName: "dave", score: 4 },
        { key: 5, playerName: "sarah", score: 10 },
      ],
    });
  }

  render() {
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
              <tr key={player.key}>
                <td>{player.playerName}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
