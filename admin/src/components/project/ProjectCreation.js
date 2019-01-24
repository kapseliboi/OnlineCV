import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ImageField from "../utils/ImageField";
import TextField from "../utils/TextField";
import Modal from "../utils/Modal";
import {createOrUpdateProject} from "../../actions/projectActions";

function mapDispatchToProps(dispatch) {
  return {
    createOrUpdateProject: (formData, title, history, index, removedImgs) => dispatch(
      createOrUpdateProject(formData, title, history, index, removedImgs))
  };
}

const mapStateToProps = state => {
  return {
    loading: state.project.creating,
    projects: state.project.projects
  };
};

class ProjectCreation extends Component {
  constructor (props) {
    super(props);
    var newContent = [];
    var title = "";
    var id = 0;
    var edit = false;
    if (this.props.match.params.index) {
      if (!this.props.projects[this.props.match.params.index]) {
        this.props.history.push("/projects");
      }
      else {
        newContent = this.props.projects[this.props.match.params.index].content.map(
          (content, i) => {
            content.id = i;
            return content;
          }
        );
        edit = true;
        id = newContent.length;
        title = this.props.projects[this.props.match.params.index].title;
      }
    }
    this.state = {
      title: title,
      content: newContent,
      id: id,
      toRemove: null,
      edit: edit,
      removedImages: []
    };
  }

  onSubmit = event => {
    event.preventDefault();
    if (this.state.edit) {
      this.props.createOrUpdateProject(this.state.content, this.state.title,
        this.props.history, this.props.match.params.index, this.state.removedImages);
    }
    else {
      this.props.createOrUpdateProject(this.state.content, this.state.title,
        this.props.history, null, null);
    }
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
    if (newContent[i].url && this.state.removedImages.indexOf(newContent[i].url) === -1) {
      this.setState({
        content: newContent,
        removedImages: this.state.removedImages.concat(newContent[i].url)
      });
    }
    else {
      this.setState({ content: newContent });
    }
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
      id: this.state.id
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
    if (this.state.content[this.state.toRemove].url) {
      const removedURL = this.state.content[this.state.toRemove].url;
      this.setState({
        content: newContent,
        toRemove: null,
        removedImages: this.state.removedImages.concat(removedURL)
      });
    }
    else {
      this.setState({ content: newContent, toRemove: null });
    }
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
          setRemoved={this.setToBeRemoved} edit={this.state.edit}
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
    if (this.state.toRemove !== null) {
      if (this.state.content[this.state.toRemove].type === "text") {
        target = "this text field";
      }
      else {
        target="this image field";
      }
    }
    // Submit button text
    var submitText;
    if (this.props.loading) {
      submitText = "Loading";
    }
    else if (this.state.edit) {
      submitText = "Save changes";
    }
    else {
      submitText ="Create";
    }

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
