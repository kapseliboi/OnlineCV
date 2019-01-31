import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { createOrUpdateApplication } from "../../actions/applicationActions";

function mapDispatchToProps(dispatch) {
  return {
    createOrUpdateApplication: (formData, username, history) => dispatch(
      createOrUpdateApplication(formData, username, history))
  };
}

const mapStateToProps = state => {
  return {
    users: state.application.users
  };
};

class ApplicationCreation extends Component {
  constructor (props) {
    super(props);
    if (this.props.users) {
      const user = this.props.users.find((user) => {
        return user.username === this.props.match.params.username;
      });
      if (user) {
        if (user.application && user.application.content.length === 4) {
          this.state = {
            titleMe: user.application.content[0],
            textMe: user.application.content[1],
            titleYou: user.application.content[2],
            textYou: user.application.content[3]
          };
        }
        else {
          this.state = {
            titleMe: "",
            textMe: "",
            titleYou: "",
            textYou: ""
          };
        }
        return;
      }
    }
    this.props.history.push("/users");
    this.state = {
      titleMe: "",
      textMe: "",
      titleYou: "",
      textYou: ""
    };
  }

  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const formData = {
      titleMe: this.state.titleMe,
      textMe: this.state.textMe,
      titleYou: this.state.titleYou,
      textYou: this.state.textYou
    };
    this.props.createOrUpdateApplication(formData,
      this.props.match.params.username, this.props.history);
  }

  render () {
    return (
      <main className="py-md-4 pl-md-5">
        <form>
          <div className="form-group">
            <label htmlFor="titleMe">Title for marketing yourself</label>
            <input type="text" id="titleMe" className="form-control"
            onChange={this.onChange} value={this.state.titleMe} />
          </div>
          <div className="form-group">
            <label htmlFor="textMe">Text for marketing yourself</label>
            <textarea id="textMe" className="form-control" rows="10"
            onChange={this.onChange} value={this.state.textMe}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="titleYou">Title for expressing your interest</label>
            <input type="text" id="titleYou" className="form-control"
            onChange={this.onChange} value={this.state.titleYou} />
          </div>
          <div className="form-group">
            <label htmlFor="textYou">Text for expressing your interest</label>
            <textarea id="textYou" className="form-control" rows="10"
            onChange={this.onChange} value={this.state.textYou}></textarea>
          </div>
        </form>
        <button type="button" onClick={this.onSubmit}
        className="btn btn-lg btn-primary">Save</button>
      </main>
  );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApplicationCreation));
