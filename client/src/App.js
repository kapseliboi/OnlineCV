import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import store from "./store";
import { getCSRFToken } from "./actions/authActions";
import Landing from "./components/layout/Landing";
import AuthLanding from "./components/layout/AuthLanding";

function mapDispatchToProps(dispatch) {
  return {
    getCSRFToken: () => dispatch(getCSRFToken())
  }
}

class App extends Component {
  componentDidMount() {
    this.props.getCSRFToken();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={AuthLanding} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
