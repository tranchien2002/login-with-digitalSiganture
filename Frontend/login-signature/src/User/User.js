import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

class User extends Component {
  state = {
    loading: false,
    address: null,
    name: ''
  }

  handleChange = ({target: {value}}) => {
    console.log(value)
    this.setState({name: value})
  } 

  handleSubmit = async ({target}) => {
    const accessToken = this.props.auth
    const name = this.state.name
    const decode = jwtDecode(accessToken)
    await this.setState({ loading: true });
    let headers = {
      Authorization: accessToken  
    }
    let res = await axios.put("http://localhost:3001/api/v1/users/" + decode.id, {
      user: {
        name: name
      }
    }, {headers: headers})
    await this.setState({loading: false}) 
  }

  componentWillMount() {
    const accessToken = this.props.auth
    const decode = jwtDecode(accessToken)
    let headers = {
      "Authorization": accessToken  
    }
    axios.get("http://localhost:3001/api/v1/users/" + decode.id, headers)
    .then(res => {
      const address = res.data.user.address
      const name = res.data.user.name 
      console.log(name)
      this.setState({address: address, name: name})
      console.log(this.state.address)
    })
  }
  render() {
    const { onLoggedOut } = this.props;
    const { loading, address, name } = this.state;

    return (
      <div>
        <div>
          <p>
            My Address : {address}
          </p>
          <p>My name is: {name ? <b>{name}</b> : 'not set.'}</p>
        </div>
        <div>
          <label htmlFor="username">Change Name: </label>
          <input name="username" onChange={this.handleChange}/>
          <button disabled={loading} onClick={this.handleSubmit} >
            Submit
          </button>
        </div>
        <div>
          <button onClick={onLoggedOut}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default User;