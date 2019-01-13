import axios from "axios";
import jwt_decode from "jwt-decode";

import { GET_PROJECT_DATA } from "./types";


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
