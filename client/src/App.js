import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <Register />
      <Landing />
      </div>
      </Router>
    );
  }
}

export default App;
