import React from "react";

const Modal = (props) => {
  return (
    <div className="modal fade" id={props.id} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{props.title}</h5>
            <button type="button" className="close" data-dismiss="modal"
            aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete {props.target}? This action cannot
            be reverted.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-dismiss="modal"
            onClick={props.confirm}>Delete</button>
            <button type="button" className="btn btn-secondary"
            data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
