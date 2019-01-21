import React from "react";

const TextField = props => {
  return (
    <div className="d-flex">
      <div className="border border-secondary col-10">
        <div className="form-group mx-1 my-1">
          <label htmlFor={"text" + props.id}>Text</label>
          <textarea name="textarea" id={"text" + props.id}
          onChange={(e) => props.onTextChange(props.index, e)}
          className="form-control" rows="15"/>
        </div>
      </div>
      <div className="col-2 d-flex justify-content-end">
        <button className="btn btn-outline-primary mx-1" type="button"
        disabled={props.index === 0}
        onClick={() => props.moveUp(props.index)}>&#8593;</button>

        <button className="btn btn-outline-primary mx-1" type="button"
        disabled={props.index === props.length-1}
        onClick={() => props.moveDown(props.index)}>&#8595;</button>

        <button className="btn btn-danger mx-1" type="button"
        data-toggle="modal" data-target="#deleteConfirmation"
        onClick={() => props.setRemoved(props.index)}>&#10006;</button>
      </div>
    </div>
  );
};

export default TextField;
