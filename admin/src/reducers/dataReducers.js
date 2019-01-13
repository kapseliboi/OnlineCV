import { GET_PROJECT_DATA } from "../actions/types";

const initialState = {
  projects: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_DATA:
      return {
        ...state,
        projects: action.payload
      };
    default:
      return state;
  }
}
