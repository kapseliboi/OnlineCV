import { GET_USER_DATA, GET_NEW_USER, USER_REMOVED, APPLICATION_UPDATE,
APPLICATIONS_HEADER }
from "../actions/types";

const initialState = {
  users: [],
  id: 0,
  header: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEW_USER:
      return {
        ...state,
        users: state.users.concat({...action.payload, id: state.id}),
        id: state.id + 1
      };
    case GET_USER_DATA:
      var id = state.id;
      for (var i=0; i < action.payload.length; i++) {
        action.payload[i].id = id;
        id++;
      }
      return {
        ...state,
        users: action.payload,
        id: id
      };
    case USER_REMOVED:
      var usersAfterDelete = state.users.slice();
      usersAfterDelete.splice(usersAfterDelete.findIndex(user => {
        return user.username === action.payload;
      }), 1);
      return {
        ...state,
        users: usersAfterDelete
      };
    case APPLICATION_UPDATE:
      var updatedApplicationUsers = state.users.slice();
      for (var j=0; j < updatedApplicationUsers.length; j++) {
        if (updatedApplicationUsers[j].username === action.payload.username) {
          updatedApplicationUsers[j].application = {content: action.payload.content};
          break;
        }
      }
      return {
        ...state,
        users: updatedApplicationUsers
      };
    case APPLICATIONS_HEADER:
      return {
        ...state,
        header: action.payload
      };
    default:
      return state;
  }
};
