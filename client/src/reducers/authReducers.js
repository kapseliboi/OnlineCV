import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  newUser: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state, // will be partly overwritten by the additions below
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    case USER_LOADING:
      return {
        ...state, // will be partly overwritten by the additions below
        loading: true
      };
    default:
      return state;
  }
}
