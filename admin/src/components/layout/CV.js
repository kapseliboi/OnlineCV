import React, { Component } from "react";
import { connect } from "react-redux";

import TextElement from "../cv/TextElement";
import LargeTextElement from "../cv/LargeTextElement";
import Modal from "../utils/Modal";
import { addTechnology, moveTechUp, moveTechDown, saveTechClient, updateTechServer,
deleteTechClient, addLanguage, moveLangUp, moveLangDown, saveLangClient, updateLangServer,
deleteLangClient, addExperience, moveExpUp, moveExpDown, saveExpClient, updateExpServer,
deleteExpClient, addEducation, moveEduUp, moveEduDown, saveEduClient, updateEduServer,
deleteEduClient, updateAvatar, updatePersonal, updateCVHeader }
from "../../actions/cvActions";

function mapDispatchToProps(dispatch) {
  return {
    updateAvatar: (avatar) => dispatch(updateAvatar(avatar)),
    updatePersonal: (data) => dispatch(updatePersonal(data)),
    updateHeader: (header) => dispatch(updateCVHeader(header)),

    addTechnology: () => dispatch(addTechnology()),
    moveTechUp: (index) => dispatch(moveTechUp(index)),
    moveTechDown: (index) => dispatch(moveTechDown(index)),
    saveTechClient: (info) => dispatch(saveTechClient(info)),
    updateTechServer: (technologies) => dispatch(updateTechServer(technologies)),
    deleteTechClient: index => dispatch(deleteTechClient(index)),

    addLanguage: () => dispatch(addLanguage()),
    moveLangUp: (index) => dispatch(moveLangUp(index)),
    moveLangDown: (index) => dispatch(moveLangDown(index)),
    saveLangClient: (info) => dispatch(saveLangClient(info)),
    updateLangServer: (languages) => dispatch(updateLangServer(languages)),
    deleteLangClient: index => dispatch(deleteLangClient(index)),

    addExperience: () => dispatch(addExperience()),
    moveExpUp: (index) => dispatch(moveExpUp(index)),
    moveExpDown: (index) => dispatch(moveExpDown(index)),
    saveExpClient: (info) => dispatch(saveExpClient(info)),
    updateExpServer: (experience) => dispatch(updateExpServer(experience)),
    deleteExpClient: index => dispatch(deleteExpClient(index)),

    addEducation: () => dispatch(addEducation()),
    moveEduUp: (index) => dispatch(moveEduUp(index)),
    moveEduDown: (index) => dispatch(moveEduDown(index)),
    saveEduClient: (info) => dispatch(saveEduClient(info)),
    updateEduServer: (education) => dispatch(updateEduServer(education)),
    deleteEduClient: index => dispatch(deleteEduClient(index)),
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
      phone: "",
      email: "",
      description: "",
      techToRemove: null,
      langToRemove: null,
      expToRemove: null,
      eduToRemove: null,
      header: ""
    };
  }

  onPersonalChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  onAvatarChange = event => {
    this.setState({
      avatar: event.target.files[0]
    });
  };

  onAvatarSubmit = event => {
    event.preventDefault();
    this.props.updateAvatar(this.state.avatar);
  };

  onPersonalSubmit = event => {
    event.preventDefault();
    this.props.updatePersonal({
      phone: this.state.phone,
      email: this.state.email,
      description: this.state.description
    });
  };

  setTechToRemove = index => {
    this.setState({techToRemove: index});
  };

  onTechRemoval = () => {
    this.props.deleteTechClient(this.state.techToRemove);
    this.setState({techToRemove: null});
  };

  updateTechServer = () => {
    console.log("Called");
    this.props.updateTechServer(this.props.technologies);
  }

  setLangToRemove = index => {
    this.setState({langToRemove: index});
  };

  onLangRemoval = () => {
    this.props.deleteLangClient(this.state.langToRemove);
    this.setState({langToRemove: null});
  };

  updateLangServer = () => {
    this.props.updateLangServer(this.props.languages);
  }

  setExpToRemove = index => {
    this.setState({expToRemove: index});
  };

  onExpRemoval = () => {
    this.props.deleteExpClient(this.state.expToRemove);
    this.setState({expToRemove: null});
  };

  updateExpServer = () => {
    this.props.updateExpServer(this.props.experience);
  }

  setEduToRemove = index => {
    this.setState({eduToRemove: index});
  };

  onEduRemoval = () => {
    this.props.deleteEduClient(this.state.eduToRemove);
    this.setState({eduToRemove: null});
  };

  updateEduServer = () => {
    this.props.updateEduServer(this.props.education);
  }

  onChangeHeader = event => {
    this.setState({header: event.target.value});
  }

  onHeaderSubmit = event => {
    event.preventDefault();
    this.props.updateHeader(this.state.header);
  }

  render () {
    return (
      <main className="py-md-4 pl-md-5">
      <Modal title="Confirm remove action" target={this.state.techToRemove !== null ?
      this.props.technologies[this.state.techToRemove].name : ""}
      confirm={this.onTechRemoval} id="techDeleteConfirmation"/>

      <Modal title="Confirm remove action" target={this.state.langToRemove !== null ?
      this.props.languages[this.state.langToRemove].name : ""}
      confirm={this.onLangRemoval} id="langDeleteConfirmation"/>

      <Modal title="Confirm remove action" target={this.state.expToRemove !== null ?
      this.props.experience[this.state.expToRemove].title : ""}
      confirm={this.onExpRemoval} id="expDeleteConfirmation"/>

      <Modal title="Confirm remove action" target={this.state.eduToRemove !== null ?
      this.props.education[this.state.eduToRemove].title : ""}
      confirm={this.onEduRemoval} id="eduDeleteConfirmation"/>
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
                <a href={"/" + this.props.avatar} target="_blank"
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
                <label htmlFor="phone">Phone number</label>
                <input type="text" id="phone" className="form-control"
                onChange={this.onPersonalChange} value={this.state.phone} />
              </div>
              <div className="form-group col-6">
                <label htmlFor="currentphonenumber">Current</label>
                <p id="currentphonenumber">{this.props.phone}</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="email">Email address</label>
                <input type="text" id="email" className="form-control"
                onChange={this.onPersonalChange} value={this.state.email} />
              </div>
              <div className="form-group col-6">
                <label htmlFor="currentemail">Current</label>
                <p id="currentemail">{this.props.email}</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="description">Short description</label>
                <textarea id="description" className="form-control" rows="4"
                onChange={this.onPersonalChange} value={this.state.description}></textarea>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="currentdescription">Current</label>
                <p id="currentdescription">{this.props.description}</p>
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
          onClick={this.updateTechServer}>Update technology</button>
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
          onClick={this.updateLangServer}>Update language</button>
        </div>

        <h3 className="mt-3">Experience</h3>
        <div className="container-fluid my-2">
          {this.props.experience.map((exp, i) =>
            <LargeTextElement key={exp.id} id={"exp"+exp.id} title={exp.title}
            description={exp.description} origin={exp.employer}
            originTitle="Employer" start={exp.start} end={exp.end}
            index={i} length={this.props.experience.length}
            moveUp={this.props.moveExpUp} moveDown={this.props.moveExpDown}
            setRemoved={this.setExpToRemove} save={this.props.saveExpClient}
            modal="expDeleteConfirmation"/>
          )}
        </div>
        <div>
          <button type="button" className="btn btn-secondary"
          onClick={this.props.addExperience}>Add experience</button>
        </div>
        <div className="mt-3">
          <button type="button" className="btn btn-primary"
          onClick={this.updateExpServer}>Update experience</button>
        </div>

        <h3 className="mt-3">Education</h3>
        <div className="container-fluid my-2">
          {this.props.education.map((edu, i) =>
            <LargeTextElement key={edu.id} id={"edu"+edu.id} title={edu.title}
            description={edu.description} origin={edu.school}
            originTitle="School" start={edu.start} end={edu.end}
            index={i} length={this.props.education.length}
            moveUp={this.props.moveEduUp} moveDown={this.props.moveEduDown}
            setRemoved={this.setEduToRemove} save={this.props.saveEduClient}
            modal="eduDeleteConfirmation"/>
          )}
        </div>
        <div>
          <button type="button" className="btn btn-secondary"
          onClick={this.props.addEducation}>Add education</button>
        </div>
        <div className="mt-3">
          <button type="button" className="btn btn-primary"
          onClick={this.updateEduServer}>Update education</button>
        </div>

        <h1 className="py-md-4">Your CV settings</h1>
        <form onSubmit={this.onHeaderSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputHeader">Header shown to users</label>
              <input type="text" className="form-control" id="header"
              placeholder="Header" onChange={this.onChangeHeader} value={this.state.header}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CV);
