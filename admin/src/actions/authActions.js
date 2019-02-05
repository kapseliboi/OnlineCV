import axios from "axios";

import {
  GET_REGISTER_ERRORS,
  NEW_USER_REGISTERED,
  GET_NEW_USER
} from "./types";

// Action creator
export const registerUser = (userData, history) => dispatch => {
  axios.post("/api/admins/registerUser", userData).then(
    res => {
      const newUser = {
        name: userData.name,
        username: userData.username,
        password: res.data.password
      };
      dispatch({
        type: NEW_USER_REGISTERED,
        payload: newUser
      });
      dispatch({
        type: GET_NEW_USER,
        payload: {name: userData.name, username: userData.username}
      });
    }
  ).catch(
    err => dispatch({   // Action
      type: GET_REGISTER_ERRORS,
      payload: err.response.data
    })
  );
};


export const logoutUser = () => dispatch => {
  axios.post("/api/users/logout").then(
    res => {
      window.location.href = process.env.NODE_ENV === "production" ?
      window.location.protocol + "//" + window.location.hostname +
      ":" + window.location.port : "http://localhost:3000";
    }
  ).catch(function(err) {
    window.location.href = process.env.NODE_ENV === "production" ?
    window.location.protocol + "//" + window.location.hostname +
    ":" + window.location.port : "http://localhost:3000";
  }
  );
};
