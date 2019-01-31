import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { getStartData } from "./actions/globalActions";
import Navbar from "./components/layout/Navbar";
import CV from "./components/layout/CV";
import Projects from "./components/layout/Projects";
import Users from "./components/layout/Users";
import ProjectCreation from "./components/project/ProjectCreation";
import Register from "./components/auth/Register";
import ApplicationCreation from "./components/users/ApplicationCreation";
require ('./App.css');

function mapDispatchToProps(dispatch) {
  return {
    getStartData: () => dispatch(getStartData())
  }
}

class App extends Component {
  componentDidMount() {
    this.props.getStartData();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1 className="display-1 text-center w-100">OnlineCV</h1>
          <Navbar />
          <Switch>
            <Route exact path="/" component={CV} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/projects/add" component={ProjectCreation} />
            <Route exact path="/projects/edit/:index" component={ProjectCreation} />
            <Route exact path="/users/add" component={Register} />
            <Route exact path="/users/edit/:username" component={ApplicationCreation} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
