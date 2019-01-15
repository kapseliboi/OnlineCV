import React, { Component } from "react";

import Login from "./../auth/Login";

class Landing extends Component {
  
  render () {
    return (
      <div className="container">
        <div>
          <h1 className="display-1 text-center">OnlineCV</h1>
        </div>
        <div className="mt-5 align-items-center">
          <h1 className="text-center">Welcome!</h1>
          <p className="mt-3 text-center">Please enter the provided credentials below:</p>
        </div>
        <Login />
      </div>



    );
  }
}

export default Landing;
