import React from "react";

const CVText = props => {
  return (
    <div>
      <h6 className="text-white"><b>{props.name}</b></h6>
      {props.description &&
      <p className="mt-1 text-white"
      dangerouslySetInnerHTML={{__html: props.description}}/>
      }
    </div>
  );
};

export default CVText;
