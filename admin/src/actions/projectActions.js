import axios from "axios";

import { CREATING_PROJECT, CREATE_PROJECT, MOVE_PROJECT_UP, MOVE_PROJECT_DOWN,
  DELETE_PROJECT, MOVING_PROJECT, UPDATE_PROJECT, PROJECTS_HEADER }
from "./types";


export const createOrUpdateProject = (data, title, history, index) => dispatch => {
  dispatch({ type: CREATING_PROJECT });
  var formData = new FormData();
  for (var i = 0; i < data.length; i++) {
    formData.append("type", data[i].type);
    if (data[i].type === "image") {
      formData.append("description", data[i].description);
      formData.append("caption", data[i].caption);
      if (data[i].file) {
        formData.append("file", data[i].file);
        formData.append("url", null);
        formData.append("imgID", null);
      }
      else {
        formData.append("url", data[i].url);
        formData.append("imgID", data[i].imgID);
      }
    }
    else {
      formData.append("text", data[i].text);
    }
  }
  formData.append("title", title);
  var postURL;
  if (index) {
    formData.append("index", index);
    postURL = "/api/admins/projects/update";
  }
  else {
    postURL = "/api/admins/projects/create";
  }
  axios.post(postURL, formData, {withCredentials: true,
  "Content-Type": "multipart/form-data"}).then(
    res => {
      var imgIndex = 0;
      const content = data.map((instance) => {
        if (instance.type === "image") {
          delete instance.file;
          instance.url = res.data.imgURLs[imgIndex];
          instance.imgID = res.data.imgIDs[imgIndex];
          imgIndex++;
        }
        return instance;
      });

      const project = {title: title, content: content}
      if (index) {
        dispatch({ type: UPDATE_PROJECT, payload: project, index: index});
      }
      else {
        dispatch({ type: CREATE_PROJECT, payload: project });
      }
      history.push("/projects");
    }
  ).catch(
    err => {
      // TODO
      console.log(err);
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

export const updateProjectHeader = header => dispatch => {
  axios.post("/api/admins/headers", {projects: header}).then(
    res => {
      dispatch({
        type: PROJECTS_HEADER,
        payload: header
      });
    }
  ).catch(
    err => {
      console.log(err);
    }
  );
};
