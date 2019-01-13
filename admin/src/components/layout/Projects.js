import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

  componentDidMount () {
    console.log("getProjectData-call")
    this.props.getProjectData();
  }

  render () {
    return (
      <p>Text1</p>
    );
  }
}

export default connect(null, mapDispatchToProps)(Projects);
