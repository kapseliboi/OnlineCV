import React, { Component } from "react";
import { connect } from "react-redux";

import TextElement from "../cv/TextElement";
import Modal from "../utils/Modal";
import { addTechnology, moveTechUp, moveTechDown, saveTechClient, updateTechServer,
deleteTechClient, addLanguage, moveLangUp, moveLangDown, saveLangClient, updateLangServer,
deleteLangClient }
from "../../actions/cvActions";

function mapDispatchToProps(dispatch) {
  return {
    addTechnology: () => dispatch(addTechnology()),
    moveTechUp: (index) => dispatch(moveTechUp(index)),
    moveTechDown: (index) => dispatch(moveTechDown(index)),
    saveTechClient: (info) => dispatch(saveTechClient(info)),
    updateTechServer: () => dispatch(updateTechServer()),
    deleteTechClient: index => dispatch(deleteTechClient(index)),

    addLanguage: () => dispatch(addLanguage()),
    moveLangUp: (index) => dispatch(moveLangUp(index)),
    moveLangDown: (index) => dispatch(moveLangDown(index)),
    saveLangClient: (info) => dispatch(saveLangClient(info)),
    updateLangServer: () => dispatch(updateLangServer()),
    deleteLangClient: index => dispatch(deleteLangClient(index)),
  };
}

const mapStateToProps = state => {
  return {
    phone: state.cv.phone,
    email: state.cv.email,
    interest: state.cv.interests,
    avatar: state.cv.avatar,
    description: state.cv.description,
    experience: state.cv.experience,
    education: state.cv.education,
    languages: state.cv.languages,
    technologies: state.cv.technologies,
    header: state.cv.header
  };
};

class CV extends Component {
  constructor () {
    super();
    this.state = {
      avatar: null,
      phonenumber: "",
      email: "",
      techToRemove: null,
      langToRemove: null
    };
  }

  onAvatarChange = event => {
    this.setState({
      avatar: event.target.files[0]
    });
  };

  onAvatarSubmit = event => {
    event.preventDefault();
    console.log("Lähetetään avatar");
  };

  onPersonalSubmit = event => {
    event.preventDefault();
    console.log("Lähetetään personal");
  };

  setTechToRemove = index => {
    this.setState({techToRemove: index});
  };

  onTechRemoval = () => {
    this.props.deleteTechClient(this.state.techToRemove);
    this.setState({techToRemove: null});
  };

  setLangToRemove = index => {
    this.setState({langToRemove: index});
  };

  onLangRemoval = () => {
    this.props.deleteLangClient(this.state.langToRemove);
    this.setState({langToRemove: null});
  };

  render () {
    return (
      <main className="py-md-4 pl-md-5">
      <Modal title="Confirm remove action" target={this.state.techToRemove !== null ?
      this.props.technologies[this.state.techToRemove].name : ""}
      confirm={this.onTechRemoval} id="techDeleteConfirmation"/>
      <Modal title="Confirm remove action" target={this.state.langToRemove !== null ?
      this.props.languages[this.state.langToRemove].name : ""}
      confirm={this.onLangRemoval} id="langDeleteConfirmation"/>
        <h1>Your CV</h1>
        <div className="container-fluid my-2">
          <form onSubmit={this.onAvatarSubmit}>
            <div className="form-row">
              <div className="form-group my-3">
                <label htmlFor="avatar">Avatar</label>
                <input type="file" name="avatar" id="avatar"
                onChange={this.onAvatarChange} accept="image/png, image/jpeg"
                className="form-control-file" />
              </div>
              <div className="form-group">
                <a href={"/"} target="_blank"
                rel="noopener noreferrer">Current avatar</a>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Update avatar</button>
          </form>
        </div>
        <h3 className="mt-4">Personal info</h3>
        <div className="container-fluid my-3">
          <form onSubmit={this.onPersonalSubmit}>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="phonenumber">Phone number</label>
                <input type="text" id="phonenumber" className="form-control" />
              </div>
              <div className="form-group col-6">
                <label htmlFor="currentphonenumber">Current</label>
                <p id="currentphonenumber">1234567890</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="email">Email address</label>
                <input type="text" id="email" className="form-control" />
              </div>
              <div className="form-group col-6">
                <label htmlFor="currentemail">Current</label>
                <p id="currentemail">hei@asdfae.sdf</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="description">Short description</label>
                <textarea id="description" className="form-control" rows="4"></textarea>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="currentdescription">Current</label>
                <p id="currentdescription">asdfjaksdfhjkaskdjhfkjhldaskfjhjkhlasdfjkhl
                asidfjkasdkfjakhjsldflkjhaskhjldfkhjlas
                asdkhjflkahjsdfkhjasdklhjfdasklhjfhajkl
                asdhkjfsdakjfkalhfjsdhljkafdshlajkdfs</p>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Update personal info</button>
          </form>
        </div>

        <h3 className="mt-3">Technologies</h3>
        <div className="container-fluid my-2">
          {this.props.technologies.map((tech, i) =>
            <TextElement key={tech.id} id={"tech"+tech.id} name={tech.name}
            description={tech.description} index={i}
            length={this.props.technologies.length}
            moveUp={this.props.moveTechUp} moveDown={this.props.moveTechDown}
            setRemoved={this.setTechToRemove} save={this.props.saveTechClient}
            modal="techDeleteConfirmation"/>
          )}
        </div>
        <div>
          <button type="button" className="btn btn-secondary"
          onClick={this.props.addTechnology}>Add technology</button>
        </div>
        <div className="mt-3">
          <button type="button" className="btn btn-primary"
          onClick={this.props.saveTechServer}>Update technology</button>
        </div>

        <h3 className="mt-3">Languages</h3>
        <div className="container-fluid my-2">
          {this.props.languages.map((lang, i) =>
            <TextElement key={lang.id} id={"lang"+lang.id} name={lang.name}
            description={lang.description} index={i}
            length={this.props.languages.length}
            moveUp={this.props.moveLangUp} moveDown={this.props.moveLangDown}
            setRemoved={this.setLangToRemove} save={this.props.saveLangClient}
            modal="langDeleteConfirmation"/>
          )}
        </div>
        <div>
          <button type="button" className="btn btn-secondary"
          onClick={this.props.addLanguage}>Add language</button>
        </div>
        <div className="mt-3">
          <button type="button" className="btn btn-primary"
          onClick={this.props.saveLangServer}>Update language</button>
        </div>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CV);
