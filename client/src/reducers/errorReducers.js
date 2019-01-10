import { GET_REGISTER_ERRORS, GET_LOGIN_ERRORS } from "../actions/types";

const initialState = {};

export function loginErrorReducer (state = initialState, action) {
  switch (action.type) {
    case GET_LOGIN_ERRORS:
      return action.payload;
    default:
      return state;
  }
}

export function registerErrorReducer (state = initialState, action) {
  switch (action.type) {
    case GET_REGISTER_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
