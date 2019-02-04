import axios from "axios";

import { GET_START_DATA, SET_CURRENT_USER } from "./types";

export const getStartData = (history) => dispatch => {
  axios.get("/api/users/startdata").then(
    res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data.payload
      });
      dispatch({
        type: GET_START_DATA,
        headers: res.data.headers,
        cv: res.data.cv,
        projects: res.data.projects,
        application: res.data.application,
        adminName: res.data.adminName
      });
    }
  ).catch(
    err => {
      if (err.response.status === 401) {
        history.push("/");
      }
    }
  );
};
