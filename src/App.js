import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balancePool: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balancePool = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balancePool });
  }

  render() {
    const { manager, players, balancePool } = this.state;
  
    return (
      <div className="App">
        <h2>lottery Contract</h2>
        <p>This contract is managed by {manager}</p>
        <p>
          There are currently { players.length} people that have entered the pool,
          competing to win {web3.utils.fromWei(balancePool, "ether")} amount of
          ether.
        </p>
      </div>
    );
  }
}

export default App;
