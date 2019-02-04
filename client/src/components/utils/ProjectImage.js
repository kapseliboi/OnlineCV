import React from "react";

const ProjectImage = props => {
  return (
    <div className="mt-2 align-items-center">
      <figure className="figure">
        <img className="figure-img img-fluid rounded"
        src={"http://localhost:5000/" + props.url} alt={props.description} />
        <figcaption className="figure-caption">{props.caption}</figcaption>
      </figure>
    </div>
  );
}

export default ProjectImage;
