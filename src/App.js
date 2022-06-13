import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balancePool: "",
    value: '',
    message: '',
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balancePool = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balancePool });
  }

  onFormSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting to approve transaction...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'Transaction success. You\'re in the lottery pool!'});
  }


  render() {
    const { manager, players, balancePool, value, message } = this.state;
  
    return (
      <div>
        <h2 className="ui inverted header vertical center aligned segment">LOTTERY CONTRACT</h2>

        <div className="ui fluid container">
          <div className="ui block header very padded text center aligned segment">
            <p className="ui tiny header">This contract is managed by {manager}</p>
            <p className="sub header">
              There are currently <b>{ players.length}</b> people that have entered the pool,
              competing to win <b>{web3.utils.fromWei(balancePool, "ether")}</b> amount of
              ether.
            </p>
          </div>
        </div>

        <div className="ui container">
            <form onSubmit={this.onFormSubmit}>
              <h4>Want to try your luck?</h4>
              <div>
                <label>Amount of ether to enter</label>
                <input 
                  value={value}
                  onChange={ e => this.setState({ value: e.target.value })}                
                />
              </div>
              <button>Enter</button>
            </form>
            <hr />
            <h1>{message}</h1>
        </div>
      </div>
    );
  }
}

export default App;
