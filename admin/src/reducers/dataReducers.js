import { GET_PROJECT_DATA, CREATE_PROJECT, CREATING_PROJECT, GET_START_DATA}
from "../actions/types";

const initialState = {
  projects: [],
  creating: false,
  id: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_DATA:
      return {
        ...state,
        projects: action.payload
      };
    case CREATING_PROJECT:
      return {
        ...state,
        creating: true
      };
    case CREATE_PROJECT:
      return {
        ...state,
        creating: false,
        projects: state.projects.concat({...action.payload, id: state.id}),
        id: state.id + 1
      };
    case GET_START_DATA:
      var id = state.id;
      const projects = action.payload.map(project => {
        project.id = id;
        id++;
        return project;
      });
      return {
        ...state,
        projects: projects,
        id: id
      };
    default:
      return state;
  }
}
