import React from "react";
import { Link } from "react-router-dom";


const ProjectElement = props => {
  return (
    <div className="row">
      <div className="col-lg-6 col border border-dark">
        <div className="row">
          <div className="col-8 ">
            <span className="form-control-plaintext">{props.name}</span>
          </div>
          <div className="col-4 my-1 d-flex justify-content-center">
            <button className="btn btn-outline-primary mx-1" type="button"
            disabled={props.index===0 || props.moving}
            onClick={() => props.moveUp(props.index)}>&#8593;</button>

            <button className="btn btn-outline-primary mx-1" type="button"
            disabled={props.index===props.length-1 || props.moving}
            onClick={() => props.moveDown(props.index)}>&#8595;</button>

            <Link className="btn btn-primary mx-1" to={"/projects/edit/" + props.index}
            disabled={props.moving}>Edit</Link>

            <button className="btn btn-danger mx-1" type="button"
            data-toggle="modal" data-target="#deleteConfirmation"
            onClick={() => props.setRemoved(props.index)}
            disabled={props.moving}>&#10006;</button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ProjectElement;
