import React from "react";
import { Link } from "react-router-dom";


const UserElement = props => {
  return (
    <div className="row">
      <div className="col-lg-6 col border border-dark">
        <div className="row">
          <div className="col-8 ">
            <span className="form-control-plaintext">{props.username} ({props.name})</span>
          </div>
          <div className="col-4 my-1 d-flex justify-content-center">

            <Link className="btn btn-primary mx-1" to={"/users/edit/" + props.username}
            disabled={props.changing}>Edit</Link>

            <button className="btn btn-danger mx-1" type="button"
            data-toggle="modal" data-target={"#"+props.modal}
            onClick={() => props.setRemoved(props.username)}
            disabled={props.changing}>&#10006;</button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default UserElement;
