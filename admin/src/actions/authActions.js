import axios from "axios";

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

export const getCSRFToken = () => dispatch => {
  axios.get("/api/csrftoken").then(
    res => {
      const { csrftoken } = res.data;
      axios.defaults.headers.common["csrf-token"] = csrftoken;
    }
  );
};

export const getUser = () => dispatch => {
  // dispatch({
  //   type: USER_LOADING
  // });
  // axios.post("/api/getcurrentuser", userData).then(
  //   res => {
  //     const {payload} = res.data;
  //     localStorage.setItem("jwtToken", token);
  //     setAuthToken(token);
  //     const decoded = jwt_decode(token);
  //     dispatch({
  //       type: SET_CURRENT_USER,
  //       payload: payload
  //     });
  //   }
  // ).catch(
  //   err => dispatch ({
  //     type: GET_LOGIN_ERRORS,
  //     payload: err.response.data
  //   })
  // );
};

export const logoutUser = () => dispatch => {
  axios.post("/api/users/logout").then(
    res => {
      window.location.href = "http://localhost:3000";
    }
  ).catch(function(err) {
    window.location.href = "http://localhost:3000";
  }
  );
};
