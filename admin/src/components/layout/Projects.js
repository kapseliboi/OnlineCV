import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectElement from "../project/projectelement";
import { getProjectData } from "../../actions/dataActions";


function mapDispatchToProps(dispatch) {
  return {
    getProjectData: () => dispatch(getProjectData())
  };
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

class Projects extends Component {
  constructor () {
    super();
    this.state = {
      header: ""
    };
  }

  componentDidMount () {
    console.log("getProjectData-call")
    this.props.getProjectData();
  }

  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

  };

  jsxProjects = () => {
    return (
        <div className="container-fluid my-2">
          <ProjectElement key={1} id={1} name={"Superprojekti"}/>
          <ProjectElement key={2} id={2} name={"Ei niin superprojekti"}/>
        </div>
      );
  };

  render () {
    const projects = this.jsxProjects();
    const header = "";

    return (
      <main className="py-md-4 pl-md-5">
        <h1>Your projects</h1>
        {projects}
        <button type="button" onClick={this.props.addNewProject}
        className="btn btn-lg btn-primary">Add a new project</button>

        <h1 className="py-md-4">Your project settings</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputHeader">Header shown to users</label>
              <input type="text" className="form-control" id="inputHeader"
              placeholder="Header" onChange={this.onChange} value={this.state.header}/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="headerCurrent">Current header</label>
              <span className="form-control-plaintext"
              id="headerCurrent">{header}</span>
            </div>
          </div>
          <div className="form-row">
            <button type="submit" className="btn btn-lg btn-primary">Save</button>
          </div>
        </form>
      </main>
    );
  }
}

export default connect(null, mapDispatchToProps)(Projects);
