import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // If user is logged in apply token to every request
    // Validity of token will be checked by backend
    axios.defaults.headers.common["Authorization"] = token;
  }
  else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
