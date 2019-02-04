import { GET_START_DATA } from "../actions/types";

const initialState = {
  headers: {
    cv: null,
    applications: null,
    projects: null
  },
  cv: {
    phone: null,
    email: null,
    interests: null,
    avatar: null,
    description: null,
    experience: [],
    education: [],
    languages: [],
    technologies: [],
    github: null
  },
  projects: [],
  application: null,
  adminName: "",
  fetched: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_START_DATA:
      return {
        ...state,
        headers: action.headers,
        cv: action.cv,
        projects: action.projects,
        application: action.application,
        adminName: action.adminName,
        fetched: true
      };
    default:
      return state;
  }
};
