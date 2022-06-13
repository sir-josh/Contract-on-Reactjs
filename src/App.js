import React, { Component } from 'react'
import './App.css';
import lottery from './lottery';


class App extends Component {
  state = { 
    manager: ''
  }

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();

    this.setState({  manager });
  }

  render() {
    return (
      <div className="App">
        <h2>lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  }
}

export default App;
