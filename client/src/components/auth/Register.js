import React, { Component } from "react";
import { Link } from "react-router-dom";
const Generator = require("generate-password");

class Register extends Component {
  constructor () {
    super();
    this.state = {
      name: "",
      username: "",
      password: "",
      errors: {}
    };
  }

  onChange = event => {
    console.log(event.target.id);
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password
    };
    console.log(newUser);
  }

  generatePassword = () => {
    const newPassword = Generator.generate({ length: 40, numbers: true,
    symbols: true });
    this.setState({password: newPassword});
  }

  render () {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="container">
          <h3><b>Register</b> below</h3>
        </div>
        <div className="container">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              type="text" className="form-control" id="name"
              placeholder="Name"/>
            </div>
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
              <div className="row">
                <input onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                type="text" className="form-control col" id="password"
                placeholder="Password" aria-describedby="passwordHelp"/>
                <button className="btn btn-dark col-3" onClick={this.generatePassword}>
                Generate password
                </button>
              </div>
              <small id="passwordHelp" className="form-text">Password must be between 10 and 50 characters.</small>
            </div>
            <button type="submit" className="btn btn-lg btn-primary">Submit</button>
          </form>
        </div>
      </div>


    );
  }
}

export default Register;
