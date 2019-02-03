import axios from "axios";

import { ADD_TECHNOLOGY, MOVE_TECH_UP, MOVE_TECH_DOWN, SAVE_TECH_CLIENT,
DELETE_TECH_CLIENT, ADD_LANGUAGE, MOVE_LANG_UP, MOVE_LANG_DOWN, SAVE_LANG_CLIENT,
DELETE_LANG_CLIENT, ADD_EXPERIENCE, MOVE_EXP_UP, MOVE_EXP_DOWN, SAVE_EXP_CLIENT,
DELETE_EXP_CLIENT, ADD_EDUCATION, MOVE_EDU_UP, MOVE_EDU_DOWN, SAVE_EDU_CLIENT,
DELETE_EDU_CLIENT, UPDATE_AVATAR, UPDATE_PERSONAL, CV_HEADER }
from "./types";

export const updatePersonal = data => dispatch => {
  axios.post("/api/admins/cv/personal", data, {withCredentials: true}).then(
    res => {
      dispatch({
        type: UPDATE_PERSONAL,
        payload: data
      });
    }
  ).catch(
    err => {
      console.log(err);
    }
  );
};

export const updateAvatar = avatar => dispatch => {
  var formData = new FormData();
  formData.append("avatar", avatar);
  axios.post("/api/admins/cv/avatar", formData, {withCredentials: true,
  "Content-Type": "multipart/form-data"}).then(
    res => {
      dispatch({
        type: UPDATE_AVATAR,
        payload: res.data.avatar
      });
    }
  ).catch(
    err => {
      console.log(err);
    }
  );
};

export const addTechnology = () => dispatch => {
  dispatch({
    type: ADD_TECHNOLOGY
  });
};

export const moveTechUp = index => dispatch => {
  dispatch({
    type: MOVE_TECH_UP,
    payload: index
  });
};

export const moveTechDown = index => dispatch => {
  dispatch({
    type: MOVE_TECH_DOWN,
    payload: index
  });
};

export const saveTechClient = info => dispatch => {
  dispatch({
    type: SAVE_TECH_CLIENT,
    payload: info
  });
};

export const updateTechServer = (technologies) => dispatch => {
  axios.post("/api/admins/cv/technology", technologies, {withCredentials: true}).then(
    res => {

    }
  ).catch(
    err => {
      console.log(err);
    }
  )
};

export const deleteTechClient = index => dispatch => {
  dispatch({
    type: DELETE_TECH_CLIENT,
    payload: index
  });
};

export const addLanguage = () => dispatch => {
  dispatch({
    type: ADD_LANGUAGE
  });
};

export const moveLangUp = index => dispatch => {
  dispatch({
    type: MOVE_LANG_UP,
    payload: index
  });
};

export const moveLangDown = index => dispatch => {
  dispatch({
    type: MOVE_LANG_DOWN,
    payload: index
  });
};

export const saveLangClient = info => dispatch => {
  dispatch({
    type: SAVE_LANG_CLIENT,
    payload: info
  });
};

export const updateLangServer = (languages) => dispatch => {
  axios.post("/api/admins/cv/language", languages, {withCredentials: true}).then(
    res => {

    }
  ).catch(
    err => {
      console.log(err);
    }
  );
};

export const deleteLangClient = index => dispatch => {
  dispatch({
    type: DELETE_LANG_CLIENT,
    payload: index
  });
};

export const addExperience = () => dispatch => {
  dispatch({
    type: ADD_EXPERIENCE
  });
};

export const moveExpUp = index => dispatch => {
  dispatch({
    type: MOVE_EXP_UP,
    payload: index
  });
};

export const moveExpDown = index => dispatch => {
  dispatch({
    type: MOVE_EXP_DOWN,
    payload: index
  });
};

export const saveExpClient = info => dispatch => {
  info.employer = info.origin;
  delete info.origin;
  console.log(info);
  dispatch({
    type: SAVE_EXP_CLIENT,
    payload: info
  });
};

export const updateExpServer = (experience) => dispatch => {
  axios.post("/api/admins/cv/experience", experience, {withCredentials: true}).then(
    res => {

    }
  ).catch(
    err => {
      console.log(err);
    }
  );
};

export const deleteExpClient = index => dispatch => {
  dispatch({
    type: DELETE_EXP_CLIENT,
    payload: index
  });
};

export const addEducation = () => dispatch => {
  dispatch({
    type: ADD_EDUCATION
  });
};

export const moveEduUp = index => dispatch => {
  dispatch({
    type: MOVE_EDU_UP,
    payload: index
  });
};

export const moveEduDown = index => dispatch => {
  dispatch({
    type: MOVE_EDU_DOWN,
    payload: index
  });
};

export const saveEduClient = info => dispatch => {
  info.school = info.origin;
  delete info.origin;
  dispatch({
    type: SAVE_EDU_CLIENT,
    payload: info
  });
};

export const updateEduServer = (education) => dispatch => {
  axios.post("/api/admins/cv/education", education, {withCredentials: true}).then(
    res => {

    }
  ).catch(
    err => {
      console.log(err);
    }
  );
};

export const deleteEduClient = index => dispatch => {
  dispatch({
    type: DELETE_EDU_CLIENT,
    payload: index
  });
};

export const updateCVHeader = header => dispatch => {
  axios.post("/api/admins/headers", {cv: header}).then(
    res => {
      dispatch({
        type: CV_HEADER,
        payload: header
      });
    }
  ).catch(
    err => {
      console.log(err);
    }
  );
}
