import React from "react";

const CVTextwDate = props => {
  const start = new Date(props.start);
  var end;
  if (props.end) {
    end = new Date(props.end);
  }
  return (
    <div className="row">
      <div className="col-3">
        <div className="ml-3">
          <p>{start.getFullYear() + "-" + (start.getMonth() + 1) + " -"}<br/>
          {end ? end.getFullYear() + "-" + (end.getMonth() + 1) : "present"}</p>
        </div>
      </div>
      <div className="col-9">
        <h5><b>{props.title}</b></h5>
        <p><i>{props.origin}</i></p>
        <p dangerouslySetInnerHTML={{__html: props.description}}/>
      </div>
    </div>
  );
};

export default CVTextwDate;
