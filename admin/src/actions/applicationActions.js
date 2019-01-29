import axios from "axios";

import { USER_REMOVED } from "./types";

export const deleteUser = username => dispatch => {
  axios.post("/api/admins/deleteUser", {username: username}).then(
    res => {
      dispatch({
        type: USER_REMOVED,
        payload: username
      });
    }
  ).catch(
    err => {
      console.log(err);
    }
  );
}

export const createOrUpdateApplication = (formData, username, history) => dispatch => {
  axios.post("/api/admins/application", {...formData, username: username}).then(
    res => {
      console.log("Success");
      // dispatch({
      //   type:
      // })
    }
  ).catch(

  );
};
