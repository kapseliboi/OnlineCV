import axios from "axios";

import {
  GET_LOGIN_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  GET_START_DATA
} from "./types";


export const getCSRFToken = () => dispatch => {
  axios.get("/api/csrftoken").then(
    res => {
      const { csrftoken } = res.data;
      axios.defaults.headers.common["csrf-token"] = csrftoken;
    }
  );
};

export const loginUser = (userData, history) => dispatch => {
  dispatch({
    type: USER_LOADING
  });
  axios.post("/api/users/login", userData).then(
    res => {
      const {payload} = res.data;
      if ( payload.isAdmin ){
        window.location.href = process.env.NODE_ENV === "production" ?
        window.location.protocol + "//" + window.location.hostname +
        ":" + window.location.port + "/admin/" : "http://localhost:3001";
      }
      else {
        dispatch({
          type: GET_LOGIN_ERRORS,
          payload: {errors: null}
        });
        dispatch({
          type: SET_CURRENT_USER,
          payload: payload
        });
        dispatch({
          type: GET_START_DATA,
          headers: res.data.headers,
          cv: res.data.cv,
          projects: res.data.projects,
          application: res.data.application,
          adminName: res.data.adminName
        });
        history.push("/home");
      }
    }
  ).catch(
    err => {
      dispatch ({
        type: GET_LOGIN_ERRORS,
        payload: err.response.data
      });
      dispatch({
        type: SET_CURRENT_USER
      });
    }
  );
};

export const logoutUser = history => dispatch => {
  axios.post("/api/users/logout").then(
    res => {}).catch((err) => {}).then( () => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: ""
    });
    history.push("/");
  });
};
