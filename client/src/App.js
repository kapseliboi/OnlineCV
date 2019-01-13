import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Landing from "./components/layout/Landing";
import AuthLanding from "./components/layout/AuthLanding";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/home" component={AuthLanding} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
