import React from "react";
import { connect } from "react-redux";

import ProjectElement from "../utils/ProjectElement";

const mapStateToProps = state => {
  return {
    projects: state.data.projects
  };
};

const Projects = (props) => {
  return (
    <div className="container align-items-center mt-3">
      {props.projects && props.projects.map((project, i) =>
        <ProjectElement key={i} content={project.content} title={project.title} />
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Projects);
