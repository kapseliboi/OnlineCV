import { GET_PROJECT_DATA, CREATE_PROJECT, CREATING_PROJECT, GET_START_DATA,
  MOVE_PROJECT_UP, MOVE_PROJECT_DOWN, DELETE_PROJECT, MOVING_PROJECT,
  UPDATE_PROJECT }
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
    case GET_PROJECT_DATA: {
      return {
        ...state,
        projects: action.payload
      };
    }
    case CREATING_PROJECT: {
      return {
        ...state,
        creating: true
      };
    }
    case CREATE_PROJECT: {
      return {
        ...state,
        creating: false,
        projects: state.projects.concat({...action.payload, id: state.id}),
        id: state.id + 1
      };
    }
    case UPDATE_PROJECT: {
      var updatedProjects = state.projects.slice();
      const updatedProjectID = updatedProjects[action.index].id;
      updatedProjects[action.index] = action.payload;
      updatedProjects[action.index].id = updatedProjectID;
      return {
        ...state,
        creating: false,
        projects: updatedProjects
      };
    }
    case MOVING_PROJECT: {
      return {
        ...state,
        moving: true
      };
    }
    case MOVE_PROJECT_UP: {
      var newProjects = state.projects.slice();
      const temp = newProjects[action.payload-1];
      newProjects[action.payload-1] = newProjects[action.payload];
      newProjects[action.payload] = temp;
      return {
        ...state,
        projects: newProjects,
        moving: false
      };
    }
    case MOVE_PROJECT_DOWN: {
      var newProjects = state.projects.slice();
      const temp = newProjects[action.payload+1];
      newProjects[action.payload+1] = newProjects[action.payload];
      newProjects[action.payload] = temp;
      return {
        ...state,
        projects: newProjects,
        moving: false
      };
    }
    case DELETE_PROJECT: {
      var newProjects = state.projects.slice();
      newProjects.splice(action.payload, 1);
      return {
        ...state,
        projects: newProjects,
        moving: false
      };
    }
    case GET_START_DATA: {
      var id = state.id;
      const projects = action.payload.projects.map(project => {
        project.id = id;
        id++;
        return project;
      });
      return {
        ...state,
        projects: projects,
        id: id,
        user: action.payload.user
      };
    }
    default: {
      return state;
    }
  }
}
