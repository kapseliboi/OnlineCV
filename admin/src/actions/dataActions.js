import axios from "axios";

import { GET_PROJECT_DATA, CREATING_PROJECT, CREATE_PROJECT, GET_START_DATA,
MOVE_PROJECT_UP, MOVE_PROJECT_DOWN, DELETE_PROJECT, MOVING_PROJECT }
from "./types";


export const getProjectData = () => dispatch => {
  axios.get("/api/users/projectdata", {withCredentials: true}).then(
    res => {
      console.log("JEIJ");
      dispatch({
        type: GET_PROJECT_DATA,
        payload: {}
      });
    }
  ).catch(
    err => {
      console.log(err);
    }
  );
}

export const createProject = (data, title, history) => dispatch => {
  console.log("SUORITETAAN POST");
  dispatch({ type: CREATING_PROJECT });
  var formData = new FormData();
  for (var i = 0; i < data.length; i++) {
    formData.append("type", data[i].type);
    if (data[i].type === "image") {
      formData.append("file", data[i].file);
      formData.append("description", data[i].description);
      formData.append("caption", data[i].caption);
    }
    else {
      formData.append("text", data[i].text);
    }
  }
  formData.append("title", title);
  axios.post("/api/admins/projects/create", formData, {withCredentials: true,
  "Content-Type": "multipart/form-data"}).then(
    res => {
      var project = data.map((instance) => {
        if (instance.type === "image") {
          delete instance.file;
        }
      });
      project.title = title;
      dispatch({ type: CREATE_PROJECT, payload: project });
      history.push("/projects");
    }
  ).catch(
    err => {
      // TODO
      console.log("error");
    }

  );
};

export const getStartData = () => dispatch => {
  axios.get("/api/admins/startdata", {withCredentials: true}).then(
    res => {
      dispatch({type: GET_START_DATA, payload: res.data.projects});
    }
  ).catch(
    err => {
      // TODO
    }
  );
};

export const moveProjectUp = (index) => dispatch => {
  dispatch({type: MOVING_PROJECT});
  console.log(index);
  axios.post("/api/admins/projects/moveUp", {index: index}, {withCredentials: true}).then(
    res => {
      dispatch({type: MOVE_PROJECT_UP, payload: index});
    }
  ).catch(
    err => {
      // TODO
    }
  );
};

export const moveProjectDown = (index) => dispatch => {
  dispatch({type: MOVING_PROJECT});
  axios.post("/api/admins/projects/moveDown", {index: index}, {withCredentials: true}).then(
    res => {
      dispatch({type: MOVE_PROJECT_DOWN, payload: index});
    }
  ).catch(
    err => {
      // TODO
    }
  );
};

export const deleteProject = (index) => dispatch => {
  dispatch({type: MOVING_PROJECT});
  axios.post("/api/admins/projects/delete", {index: index}, {withCredentials: true}).then(
    res => {
      dispatch({type: DELETE_PROJECT, payload: index});
    }
  ).catch(
    err => {
      // TODO
    }
  );
};
