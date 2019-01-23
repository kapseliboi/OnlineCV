import React from "react";

const ImageField = props => {
  return (
    <div className="d-flex">
      <div className="border border-secondary col-10">
        <div className="form-group mx-1 my-1">
          <label htmlFor={"image" + props.id}>Upload image</label>

          {props.edit && props.url &&
            <a href={"/" + props.url} target="_blank"
            rel="noopener noreferrer">Current image</a>
          }

          <input type="file" name="image" id={"image" + props.id}
          onChange={(e) => props.onImageChange(props.index, e)}
          accept="image/png, image/jpeg" className="form-control-file"/>

          <label htmlFor={"image" + props.id + "caption"}>Caption</label>
          <input type="text" id={"image" + props.id + "caption"}
          className="form-control"
          onChange={(e) => props.onCaptionChange(props.index, e)}
          value={props.caption}/>

          <label htmlFor={"image" + props.id + "desc"}>Description</label>
          <input type="text" id={"image" + props.id + "desc"}
          className="form-control"
          onChange={(e) => props.onDescriptonChange(props.index, e)}
          value={props.description}/>
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

export default ImageField;
