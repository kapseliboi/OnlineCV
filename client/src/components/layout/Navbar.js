import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutUser } from "../../actions/authActions";

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: (history) => dispatch(logoutUser(history))
  };
}

class Navbar extends Component {

  onLogoutClicked = () => {
    this.props.logoutUser(this.props.history);
  }

  render () {
    const name = "this.props.name";
    const username ="asdfasdfasdf";
    return (
      <header className="navbar navbar-expand navbar-dark bg-dark"
      role="navigation">
      <div className="navbar-nav">
        <ul className="navbar-nav flex-row">
          <li className="nav-item active btn-link mx-5">
            <Link className="nav-link active" to="/"><big>CV</big></Link>
          </li>
          <li className="nav-item active btn-link mx-5">
            <Link className="nav-link" to="/"><big>Why?</big></Link>
          </li>
          <li className="nav-item btn-link active mx-5">
            <Link className="nav-link" to="/"><big>Projects</big></Link>
          </li>
        </ul>
      </div>

      <div className="ml-auto navbar-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active dropdown">
            <button className="nav-item btn-link btn nav-link dropdown-toggle ml-auto"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            id="navbarDropdown">
            {name}
            </button>
            <div className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown">
              <form>
                <span className="dropdown-item-text">{username}</span>
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

export default connect(null, mapDispatchToProps)(withRouter(Navbar));
