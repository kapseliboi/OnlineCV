import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutUser } from "../../actions/authActions";
import { getStartData } from "../../actions/dataActions";

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: (history) => dispatch(logoutUser(history)),
    getStartData: (history) => dispatch(getStartData(history))
  };
}

const mapStateToProps = state => {
  return {
    fetched: state.data.fetched,
    cv: state.data.headers.cv,
    application: state.data.headers.applications,
    projects: state.data.headers.projects,
    username: state.auth.user.username,
    name: state.auth.user.name
  };
};

class Navbar extends Component {
  constructor (props) {
    super(props);
    if (!props.fetched) {
      props.getStartData(props.history);
    }
  }
  onLogoutClicked = () => {
    this.props.logoutUser(this.props.history);
  }

  render () {
    return (
      <header className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top border-bottom border-info"
      role="navigation">
        <button className="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item mx-md-5">
              <NavLink className="nav-link" to="/home">
              <big>{this.props.cv}</big></NavLink>
            </li>
            <li className="nav-item mx-md-5">
              <NavLink className="nav-link" to="/application">
              <big>{this.props.application}</big></NavLink>
            </li>
            <li className="nav-item mx-md-5">
              <NavLink className="nav-link" to="/projects">
              <big>{this.props.projects}</big></NavLink>
            </li>
          </ul>
        </div>

        <div className="ml-auto navbar-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active dropdown">
              <button className="nav-item btn-link btn nav-link dropdown-toggle ml-auto"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
              id="navbarDropdown">
              {this.props.name}
              </button>
              <div className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown">
                <form>
                  <span className="dropdown-item-text">{this.props.username}</span>
                </form>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item btn-link" onClick={this.onLogoutClicked}>
                Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
