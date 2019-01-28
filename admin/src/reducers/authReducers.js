import { USER_LOADING, NEW_USER_REGISTERED } from "../actions/types";


const initialState = {
  loading: false,
  newUser: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state, // will be partly overwritten by the additions below
        loading: true
      };
    case NEW_USER_REGISTERED:
      return {
        ...state,
        newUser: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
