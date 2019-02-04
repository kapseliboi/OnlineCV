import React from "react";
import { connect } from "react-redux";

import CVText from "../utils/CVText";
import CVTextwDate from "../utils/CVTextwDate";

const mapStateToProps = state => {
  return {
    name: state.data.adminName,
    phone: state.data.cv.phone,
    email: state.data.cv.email,
    interests: state.data.cv.interests,
    avatar: state.data.cv.avatar,
    description: state.data.cv.description,
    experience: state.data.cv.experience,
    education: state.data.cv.education,
    languages: state.data.cv.languages,
    technologies: state.data.cv.technologies,
    github: state.data.cv.github
  };
};

const CV = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 col-lg-3 bg-dark text-center">
          <h3 className="text-white my-5"><b>{props.name}</b></h3>
        </div>
        <div className="col-md-4 col-lg-4">
          <img src={"http://localhost:5000/"+props.avatar} alt="Avatar"
          className="rounded" width="80%" />
        </div>

        <div className="col-md-4 col-lg-5">
          <p className="mt-3">{props.description}</p>
        </div>

        <div className="col-md-4 col-lg-3 bg-dark">
          <h4 className="text-white bg-secondary py-2 mt-3 text-center"><b>Personal Info</b></h4>
          <div className="mt-3">
            <h6 className="text-white"><b>Phone</b></h6>
            <p className="mt-2 text-white">{props.phone}</p>
            <h6 className="text-white mt-3"><b>E-mail</b></h6>
            <p className="mt-2 text-white">{props.email}</p>
            <a href={props.github} target="_blank"
            rel="noopener noreferrer" className="text-white mt-3"><b>Github</b></a>
          </div>
          <h4 className="text-white bg-secondary py-2 mt-2 text-center"><b>Technologies</b></h4>
          <div className="mt-3">
            {props.technologies.map((tech, i) =>
              <CVText key={i} name={tech.name} description={tech.description} />
            )}
          </div>
          <h4 className="text-white bg-secondary py-2 text-center"><b>Languages</b></h4>
          <div className="mt-3">
            {props.languages.map((lang, i) =>
              <CVText key={i} name={lang.name} description={lang.description} />
            )}
          </div>
        </div>
        <div className="col-md-8 col-lg-9">
          <hr className="mx-3"/>
          <h4 className="text-secondary ml-3"><b>Experience</b></h4>
          <hr className="mx-3" />
          <div>
            {props.experience.map((exp, i) =>
              <CVTextwDate key={i} title={exp.title} origin={exp.employer}
              description={exp.description} start={exp.start} end={exp.end} />
            )}
          </div>
          <hr className="mx-3"/>
          <h4 className="text-secondary ml-3"><b>Education</b></h4>
          <hr className="mx-3" />
          <div>
            {props.education.map((edu, i) =>
              <CVTextwDate key={i} title={edu.title} origin={edu.school}
              description={edu.description} start={edu.start} end={edu.end} />
            )}
          </div>
          <hr className="mx-3"/>
          <h4 className="text-secondary ml-3"><b>Interests</b></h4>
          <hr className="mx-3" />
          <div className="mb-3 ml-3">
            {props.interests}
          </div>
        </div>
      </div>
    </div>
  );

}

export default connect(mapStateToProps)(CV);
