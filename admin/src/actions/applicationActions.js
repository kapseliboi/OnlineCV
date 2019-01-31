import axios from "axios";

import { USER_REMOVED, APPLICATION_UPDATE, APPLICATIONS_HEADER } from "./types";

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
      dispatch({
        type: APPLICATION_UPDATE,
        payload: {content: [formData.titleMe, formData.textMe, formData.titleYou,
        formData.textYou], username: username}
      });
      history.push("/users");
    }
  ).catch(
    err => {
      console.log(err);
    }
  );
};

export const updateApplicationHeader = header => dispatch => {
  axios.post("/api/admins/headers", {applications: header}).then(
    res => {
      dispatch({
        type: APPLICATIONS_HEADER,
        payload: header
      });
    }
  ).catch(
    err => {
      console.log(err);
    }
  );
};
