import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { getCSRFToken } from "./actions/authActions";
import Landing from "./components/layout/Landing";
import CV from "./components/layout/CV";
import Application from "./components/layout/Application";
import Projects from "./components/layout/Projects";
import Navbar from "./components/layout/Navbar";
require ('./App.css');

function mapDispatchToProps(dispatch) {
  return {
    getCSRFToken: () => dispatch(getCSRFToken())
  }
}

class App extends Component {
  componentDidMount() {
    this.props.getCSRFToken();
    window.addEventListener("keydown", this.handleFirstTab);
  }

  // Select rings are disabled by default but if user uses keyboard to
  // move around the page, rings are enabled again
  handleFirstTab = event => {
    if (event.keyCode === 9) {
      document.body.classList.add("user-is-tabbing");
      window.removeEventListener("keydown", this.handleFirstTab);
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="*" component={Navbar} />
          </Switch>
          <Switch>
            <Route exact path="/home" component={CV} />
            <Route exact path="/application" component={Application} />
            <Route exact path="/projects" component={Projects} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
