import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

import { loginUser } from "../../actions/authActions";

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (userData, history) => dispatch(loginUser(userData, history))
  };
}

const mapStateToProps = state => {
  return {
    errors: state.loginErrors,
    loading: state.auth.loading
  };
};


class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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
    this.props.loginUser(userData, this.props.history);
  }

  render () {
    const errors  = this.props.errors;

    return (
      <div className="container align-items-center">
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
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

          <div className="form-group">
            <input onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            type="password"
            className={classnames("form-control", {"is-invalid": errors.password})}
            id="password"
            placeholder="Password"/>
            <div className={classnames({"invalid-feedback": errors.username})}>
              {errors.password}
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-lg btn-block btn-primary"
            disabled={this.props.loading}>
            {this.props.loading ? "Loading..." : "Login"}</button>
          </div>
          <div className={classnames({"alert alert-danger": errors.error}, "mt-2")}
          role="alert">
            <strong>{errors.error}</strong>
          </div>
      </form>
    </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
