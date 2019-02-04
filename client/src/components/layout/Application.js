import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    application: state.data.application
  };
};

const Application = (props) => {
  return (
    <div className="container align-items-center mt-3">
      <h1 className="text-center">{props.application && props.application[0] &&
        props.application[0]
      }</h1>

      <div className="mt-3 align-items-center">
        <p>{props.application && props.application[1] && props.application[1]}</p>
      </div>

      <h1 className="text-center mt-3">{props.application && props.application[2] &&
      props.application[2]}</h1>
      <div className="mt-3 align-items-center">
        <p>{props.application && props.application[3] && props.application[3]}</p>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Application);
