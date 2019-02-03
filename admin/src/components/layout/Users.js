import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../utils/Modal";
import UserElement from "../users/UserElement";
import { deleteUser, updateApplicationHeader } from "../../actions/applicationActions";

function mapDispatchToProps(dispatch) {
  return {
    deleteUser: (username) => dispatch(deleteUser(username)),
    updateHeader: (header) => dispatch(updateApplicationHeader(header))
  };
}

const mapStateToProps = state => {
  return {
    users: state.application.users,
    changing: state.application.changing,
    header: state.application.header
  };
};


class Users extends Component {
  constructor() {
    super();
    this.state = {
      header: "",
      toRemove: null
    };
  }

  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.updateHeader(this.state.header);
  };

  setToBeRemoved = (username) => {
    this.setState({toRemove: username});
  }

  onRemoval = () => {
    this.props.deleteUser(this.state.toRemove);
    this.setState({toRemove: null});
  }

  render () {
    return (
      <main className="py-md-4 pl-md-5">
        <Modal title="Confirm remove action" target={this.state.toRemove !== null ?
        this.state.toRemove : ""} id="deleteConfirmation"
        confirm={this.onRemoval} />
        <h1>Your users</h1>
        <div className="container-fluid my-2">
          {this.props.users.map((user, i) =>
            <UserElement key={user.id}
            name={user.name} username={user.username}
            setRemoved={this.setToBeRemoved}
            changing={this.props.changing}
            modal="deleteConfirmation" />
          )}
        </div>
        <Link to="/users/add"
        className="btn btn-lg btn-primary">Register a new user</Link>

        <h1 className="py-md-4">Your targeted user settings</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputHeader">Header shown to users</label>
              <input type="text" className="form-control" id="header"
              placeholder="Header" onChange={this.onChange} value={this.state.header}/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="headerCurrent">Current header</label>
              <span className="form-control-plaintext"
              id="headerCurrent">{this.props.header}</span>
            </div>
          </div>
          <div className="form-row">
            <button type="submit" className="btn btn-lg btn-primary">Save header</button>
          </div>
        </form>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
