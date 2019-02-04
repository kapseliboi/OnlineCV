import React from "react";

import ProjectText from "./ProjectText";
import ProjectImage from "./ProjectImage";

function renderField (field, i) {
  if (field.type === "text") {
    return (
      <ProjectText key={i} text={field.text} />
    );
  }
  if (field.type === "image") {
    return (
      <ProjectImage key={i} url={field.url} caption={field.caption}
      description={field.description} />
    );
  }
}

const ProjectElement = props => {
  return (
    <div className="mt-3">
      <h1 className="text-center mb-1">{props.title}</h1>
      {props.content.map((field, i) =>
        {return renderField(field, i)}
      )}
    </div>
  );
};

export default ProjectElement;
