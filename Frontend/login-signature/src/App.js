import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login'
import User from './User/User'

const LS_KEY = 'mm-login-demo:auth';

class App extends Component {
  componentWillMount() {
    // Access token is stored in localstorage
    const auth = JSON.parse(localStorage.getItem(LS_KEY));
    this.setState({
      auth
    });
  }

  handleLoggedIn = auth => {
    localStorage.setItem(LS_KEY, JSON.stringify(auth));
    this.setState({ auth });
  };

  handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    this.setState({ auth: undefined });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {this.state.auth ? (
            <User auth={this.state.auth} onLoggedOut={this.handleLoggedOut} />
          ) : (
            <Login onLoggedIn={this.handleLoggedIn} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
