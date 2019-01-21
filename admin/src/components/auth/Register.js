import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

import { registerUser } from "../../actions/authActions";

function mapDispatchToProps(dispatch) {
  return {
    registerUser: newUser => dispatch(registerUser(newUser))
  };
}

const mapStateToProps = state => {
  return {
    errors: state.registerErrors,
    newUser: state.auth.newUser
  };
};


class Register extends Component {
  constructor () {
    super();
    this.state = {
      name: "",
      username: ""
    };
  }

  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      username: this.state.username
    };
    console.log(newUser);
    this.props.registerUser(newUser);
  };


  render () {
    const errors = this.props.errors;;

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
              type="text"
              className={classnames("form-control", {"is-invalid": errors.name})}
              id="name"
              placeholder="Name"/>
              <div className={classnames({"invalid-feedback": errors.name})}>
                {errors.name}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input onChange={this.onChange}
              value={this.state.username}
              type="text"
              className={classnames("form-control", {"is-invalid": errors.username})}
              id="username"
              placeholder="Username"/>
              <div className={classnames({"invalid-feedback": errors.username})}>
                {errors.username}
              </div>
            </div>

            <button type="submit" className="btn btn-lg btn-primary">Submit</button>
          </form>
        </div>
      </div>


    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  newUser: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
