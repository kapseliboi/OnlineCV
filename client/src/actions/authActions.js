import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";
import {
  GET_LOGIN_ERRORS,
  GET_REGISTER_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  NEW_USER_REGISTERED
} from "./types";

// Action creator
export const registerUser = (userData, history) => dispatch => {
  axios.post("/api/users/register", userData).then(
    res => {
      // history.push("login"); // redirect to login if succesful
      const { newUser } = res.data;
      dispatch({
        type: NEW_USER_REGISTERED,
        payload: newUser
      });
    }
  ).catch(
    err => dispatch({   // Action
      type: GET_REGISTER_ERRORS,
      payload: err.response.data
    })
  );
};

export const loginUser = (userData, history) => dispatch => {
  dispatch({
    type: USER_LOADING
  });
  axios.post("/api/users/login", userData).then(
    res => {
      const {token} = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      console.log(decoded);
      if ( decoded.isAdmin ){
        window.location.href = "http://localhost:3001";
      }
      else {
        dispatch({
          type: SET_CURRENT_USER,
          payload: decoded
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
    }
  );
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: ""
  });
};
