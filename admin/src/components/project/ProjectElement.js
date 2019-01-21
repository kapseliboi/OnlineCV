import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProjectElement extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-6 col border border-dark">
          <div className="row">
            <div className="col-8 ">
              <span className="form-control-plaintext">{this.props.name}</span>
            </div>
            <div className="col-4 my-1 d-flex justify-content-center">
              <button className="btn btn-outline-primary mx-1" type="button">&#8593;</button>
              <button className="btn btn-outline-primary mx-1" type="button">&#8595;</button>
              <Link className="btn btn-primary mx-1" to={"/projects/" + this.props.id}>Edit</Link>
              <button className="btn btn-danger mx-1" type="button">&#10006;</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default ProjectElement;
