import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    currentUserIsManager: false,
    players: [],
    balancePool: "",
    value: "",
    message: {
      body: "",
      type: "",
      icon: "",
    },
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balancePool = await web3.eth.getBalance(lottery.options.address);
    
    const currentUser = await web3.eth.getAccounts();
    const currentUserIsManager = manager === currentUser[0];

    this.setState({ manager, players, balancePool, currentUserIsManager });
  }

  onFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();

      this.setState({
        message: {
          body: "Waiting to approve transaction",
          type: "info",
          icon: "info circle icon",
        },
      });

      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });

      this.setState({
        message: {
          body: "Transaction success. You're in the lottery pool!",
          type: "success",
          icon: "check icon",
        },
      });
    } catch (error) {
      this.setState({
        message: {
          body: error.message,
          type: "error",
          icon: "x icon",
        },
      });
    }
  };

  pickWinner = async () => {
    try {
      const accounts = await web3.eth.getAccounts();

      this.setState({
        message: {
          body: "Waiting to pick a winner...",
          type: "info",
          icon: "info circle icon",
        },
      });

      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });

      this.setState({
        message: {
          body: "A winner has been picked!",
          type: "success",
          icon: "check icon",
        },
      });
    } catch (error) {
      this.setState({
        message: {
          body: error.message,
          type: "error",
          icon: "x icon",
        },
      });
    }
  };

  showPickWinner = () => {
      return(
        <div>
            <h4>Ready to pick a winner</h4>
            <button
              onClick={this.pickWinner}
              className="ui secondary button"
              style={{ marginTop: "1.3rem", padding: "15px 50px" }}>
              Pick a winner!
            </button>
        </div>
      )
  }

  hidePickWinner = () =>{
    return (
      <div class="ui info message">
        <i class="info icon"></i>
        The manager will be the one to shuffle the pool. Winner will automatically be credited.
      </div>
    )
  }

  render() {
    const { manager, players, balancePool, value, message } = this.state;

    return (
      <div style={{ paddingBottom: "3rem"}}>
        <h2 className="ui inverted header vertical center aligned segment">
          LOTTERY CONTRACT
        </h2>

        <div className="ui fluid container">
          <div className="ui block header very padded text center aligned segment">
            <p className="ui tiny header">
              This contract is managed by {manager}
            </p>
            <p className="sub header">
              There are currently <b>{players.length}</b> people that have
              entered the pool, competing to win{" "}
              <b>{web3.utils.fromWei(balancePool, "ether")}</b> amount of ether.
            </p>
          </div>
        </div>

        {/* Pick Winner by the manager start here */}
        <div className="ui container" style={{ marginTop: "3rem"}}>
          {this.state.currentUserIsManager&&
            <div className="ui fluid centered card" style={{ marginBottom:"2rem", padding: "2rem" }}>
              {this.showPickWinner()}
            </div>
          }
          {!this.state.currentUserIsManager&&
            this.hidePickWinner()
          }
        </div>
        {/* Pick Winner by the manager ends here */}

        <div className="ui container" style={{ marginTop: "2rem" }}>
          <div className="ui fluid centered card" style={{ padding: "2rem" }}>
            <div className="content">
              <form onSubmit={this.onFormSubmit} className="ui fluid form">
                <h3 className="ui block header">Want to try your luck?</h3>

                <div className="eight wide field centered" style={{ marginTop: "3rem" }}>
                  <div className="ui pointing below label">
                    Amount of ether to enter
                  </div>

                  <div className="ui right labeled input">
                    <input
                      value={value}
                      onChange={(e) => this.setState({ value: e.target.value })}
                      type="number"
                      placeholder="0.2"
                      required
                    />
                    <div className="ui basic label">Ether</div>
                  </div>
                </div>

                <button
                  className="ui secondary button"
                  style={{ marginTop: "1.3rem", padding: "15px 50px" }}>
                  Enter
                </button>
              </form>
            </div>
    
            {/* Message body start here */}
            {message.body && (
              <div className={`ui ${message.type} message`}>
                <i className={`large ${message.icon}`}></i>
                {message.body} &nbsp;&nbsp;
                {message.type === "info" && (
                  <i className="large spinner loading icon"></i>
                )}
              </div>
            )}
            {/* Message body end here */}
     
          </div>
        </div>
      </div>
    );
  }
}

export default App;
