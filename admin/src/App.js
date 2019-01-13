import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Projects from "./components/layout/Projects";
import Users from "./components/layout/Users";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <h1 className="display-1 text-center w-100">OnlineCV</h1>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/users" component={Users} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
