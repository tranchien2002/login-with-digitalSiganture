import React, { Component } from 'react';
import Web3 from 'web3';
import axios from 'axios'
// import { resolveSrv } from 'dns';
let web3 = null
class Login extends Component {
  state = {
    loading: false // Loading button state
  };

  handleAuthenticate = async (publicAddress, signature) => {
    let res = await axios.post("http://localhost:3001/api/v1/auth/login", {
      address: publicAddress,
      signature: signature
    })
    return res.data.auth_token
  }
  handleSignMessage = async (publicAddress, nonce) => {
    let signature = await web3.eth.personal.sign(web3.utils.fromUtf8("Log in with " + nonce), publicAddress)
    return signature;
  }
  handleClick = async () => {
    const { onLoggedIn } = this.props;
    if (!window.web3) {
      window.alert('Please install MetaMask first.');
      return;
    }
    if (!web3) {
      // We don't know window.web3 version, so we use our own instance of web3
      // with provider given by window.web3
      web3 = new Web3(window.web3.currentProvider);
    }
    let accounts = await web3.eth.getAccounts()
    if (!accounts[0]) {
      window.alert('Please activate MetaMask first.');
      return;
    }
    const address = accounts[0].toLowerCase();
    this.setState({ loading: true });
    let res = await axios.get("http://localhost:3001/api/v1/get_nonce/" + address)
    let nonce = res.data.nonce 
    let signature = await this.handleSignMessage(address, nonce)    
    let token = await this.handleAuthenticate(address, signature)
    await onLoggedIn(token);
  }

  render() {
    return (
      <div>
        <button className="Login-button Login-mm" onClick={this.handleClick}>
          Login with MetaMask
        </button>
      </div>
    );
  }
}

export default Login;