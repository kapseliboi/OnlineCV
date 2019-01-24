import { GET_PROJECT_DATA, CREATE_PROJECT, CREATING_PROJECT, MOVE_PROJECT_UP,
  MOVE_PROJECT_DOWN, DELETE_PROJECT, MOVING_PROJECT, UPDATE_PROJECT }
from "../actions/types";

const initialState = {
  projects: [],
  creating: false,
  moving: false,
  id: 0,
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
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

    case UPDATE_PROJECT:
      var updatedProjects = state.projects.slice();
      const updatedProjectID = updatedProjects[action.index].id;
      updatedProjects[action.index] = action.payload;
      updatedProjects[action.index].id = updatedProjectID;
      return {
        ...state,
        creating: false,
        projects: updatedProjects
      };

    case MOVING_PROJECT:
      return {
        ...state,
        moving: true
      };

    case MOVE_PROJECT_UP:
      var uppedProjects = state.projects.slice();
      const upTemp = uppedProjects[action.payload-1];
      uppedProjects[action.payload-1] = uppedProjects[action.payload];
      uppedProjects[action.payload] = upTemp;
      return {
        ...state,
        projects: uppedProjects,
        moving: false
      };

    case MOVE_PROJECT_DOWN:
      var downProjects = state.projects.slice();
      const downTemp = downProjects[action.payload+1];
      downProjects[action.payload+1] = downProjects[action.payload];
      downProjects[action.payload] = downTemp;
      return {
        ...state,
        projects: downProjects,
        moving: false
      };

    case DELETE_PROJECT:
      var deletedProjects = state.projects.slice();
      deletedProjects.splice(action.payload, 1);
      return {
        ...state,
        projects: deletedProjects,
        moving: false
      };

    case GET_PROJECT_DATA:
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
