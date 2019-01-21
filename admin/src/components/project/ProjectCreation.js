import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ImageField from "../utils/ImageField";
import TextField from "../utils/TextField";
import Modal from "../utils/Modal";
import {createProject} from "../../actions/dataActions";

function mapDispatchToProps(dispatch) {
  return {
    createProject: (formData, title, projectCount, history) => dispatch(
      createProject(formData, title, projectCount, history))
  };
}

const mapStateToProps = state => {
  return {
    loading: state.data.creating,
    projectCount: state.data.projects.length
  };
};

class ProjectCreation extends Component {
  constructor () {
    super();
    this.state = {
      title: "",
      content: [],
      id: 0,
      toRemove: null
    };
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.createProject(this.state.content, this.state.title,
      this.props.projectCount, this.props.history);
  };


  onTitleChange = event => {
    this.setState({[event.target.id]: event.target.value});
  };

  onImageCaptionChange = (i, event) => {
    const newContent = this.state.content.slice();
    newContent[i].caption = event.target.value;
    this.setState({content: newContent});
  };

  onImageDescriptionChange = (i, event) => {
    const newContent = this.state.content.slice();
    newContent[i].description = event.target.value;
    this.setState({content: newContent});
  };

  onImageChange = (i, event) => {
    const newContent = this.state.content.slice();
    newContent[i].file = event.target.files[0];
    this.setState({ content: newContent });
  };

  addImageField = () => {
    const newContent = this.state.content.concat({
      type: "image",
      file: null,
      description:"",
      caption:"",
      id: this.state.id
    });
    this.setState({ content: newContent, id: this.state.id + 1 });
  };

  onTextChange = (i, event) => {
    const newContent = this.state.content.slice();
    newContent[i].text = event.target.value;
    this.setState({ content: newContent });
  }

  addTextField = () => {
    const newContent = this.state.content.concat({
      type: "text",
      text: "",
      id: this.state.content
    });
    this.setState({ content: newContent, id: this.state.id + 1 });
  };


  onMoveFieldUp = (index) => {
    const newContent = this.state.content.slice();
    const temp = newContent[index-1];
    newContent[index-1] = newContent[index];
    newContent[index] = temp;
    this.setState({content: newContent});
  };

  onMoveFieldDown = (index) => {
    const newContent = this.state.content.slice();
    const temp = newContent[index+1];
    newContent[index+1] = newContent[index];
    newContent[index] = temp;
    this.setState({content: newContent});
  };

  setToBeRemoved = (index) => {
    this.setState({ toRemove: index });
  }

  onRemoval = () => {
    var newContent = this.state.content.slice();
    newContent.splice(this.state.toRemove, 1);
    this.setState({ content: newContent, toRemove: null });
  }


  render () {
    // Dynamic form elements
    const formElements = this.state.content.map((field, i) => {
      if ( field.type === "image" ){
        return (
          <ImageField {...field} length={this.state.content.length}
          index={i} onImageChange={this.onImageChange}
          onCaptionChange={this.onImageCaptionChange}
          onDescriptonChange={this.onImageDescriptionChange}
          setRemoved={this.setToBeRemoved}
          moveUp={this.onMoveFieldUp} moveDown={this.onMoveFieldDown}
          key={field.id} />
        );
      }
      else {
        return (
          <TextField {...field} length={this.state.content.length}
          index={i} onTextChange={this.onTextChange}
          setRemoved={this.setToBeRemoved}
          moveUp={this.onMoveFieldUp} moveDown={this.onMoveFieldDown}
          key={field.id} />
        );
      }
    });

    // Modal setup
    var target = "";
    if (this.state.toRemove) {
      if (this.state.content[this.state.toRemove].type === "text") {
        target = "this text field";
      }
      else {
        target="this image field";
      }
    }
    // Submit button text
    const submitText = this.props.loading ? "Loading" : "Create";

    return (
      <main className="py-md-4 pl-md-5">
        <Modal title="Confirm remove action" target={target} confirm={this.onRemoval} />
        <form encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="title">Project title</label>
            <input onChange={this.onTitleChange} value={this.state.title} type="text"
            className="form-control" id="title" placeholder="Title" />
          </div>
          {formElements}
          <div className="row">
            <div className="btn-group my-3" role="group">
              <button type="button" className="btn btn-lg btn-secondary dropdown-toggle"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
              id="btngroup1">+ Add field</button>
              <div className="dropdown-menu" aria-labelledby="btngroup1">
                <button type="button" className="dropdown-item"
                onClick={this.addTextField}>Text</button>
                <button type="button" className="dropdown-item"
                onClick={this.addImageField}>Image</button>
              </div>
            </div>
          </div>
          <div className="row">
            <button type="button" className="btn btn-lg btn-primary"
            disabled={this.props.loading} onClick={this.onSubmit}>{submitText}</button>
          </div>
        </form>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectCreation));
