import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios.post("/api/users/register", userData).then(
    res => history.push("login") // redirect to login if succesful
  ).catch(
    err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const loginUser = userData => dispatch => {
  dispatch({
    type: USER_LOADING
  });
  axios.post("/api/users/login", userData).then(
    res => {
      const {token} = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    }
  ).catch(
    err => dispatch ({
      type: GET_ERRORS,
      payload: err.response.data
    });
  );
};

export const logoutUser = () => dispatch {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: ""
  });
};
