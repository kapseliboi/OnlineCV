import { GET_USER_DATA, GET_NEW_USER, USER_REMOVED } from "../actions/types";

const initialState = {
  users: [],
  id: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEW_USER:
      console.log("GOT NEW USER");
      return {
        ...state,
        users: state.users.concat({...action.payload, id: state.id}),
        id: state.id + 1
      };
    case GET_USER_DATA:
      var id = state.id;
      const newUsers = action.payload.map((user) => {
        user.id = id;
        id++;
        return user;
      });
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
    default:
      return state;
  }
};
