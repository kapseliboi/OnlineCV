import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";



class Navbar extends Component {
  componentDidMount(){
    
  }

  render () {
    const name = this.props.name;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark w-100"
      role="navigation">
        <span className="navbar-brand mb-0 h1">{name}</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav nav-justified mr-auto w-100">
            <li className="nav-item active">
              <Link className="nav-link active" to="/">CV</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/projects">Projects</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/users">Users</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
