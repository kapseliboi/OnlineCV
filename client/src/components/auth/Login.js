import React, { Component } from "react";


class Login extends Component {
  constructor () {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
  }

  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  onSubmit = event => {
    event.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(userData);
  }

  render () {
    const { errors } = this.state;
    return (
      <div className="container">
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input onChange={this.onChange}
            value={this.state.username}
            error={errors.username}
            type="text" className="form-control" id="username"
            placeholder="Username"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            type="password" className="form-control" id="password"
            placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-lg btn-primary">Login</button>
      </form>
    </div>
    );
  }
}

export default Login;
