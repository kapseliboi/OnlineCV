import React from "react";

const ProjectText = props => {
  return (
    <div className="mt-2 align-items-center">
      <p dangerouslySetInnerHTML={{__html: props.text}}/>
    </div>
  );
}

export default ProjectText;
