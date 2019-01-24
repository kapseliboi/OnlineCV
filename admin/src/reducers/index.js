import { combineReducers } from "redux";
import authReducer from "./authReducers";
import {loginErrorReducer, registerErrorReducer} from "./errorReducers";
import projectReducer from "./projectReducers";
import globalReducer from "./globalReducer";

export default combineReducers({
  auth: authReducer,
  loginErrors: loginErrorReducer,
  registerErrors: registerErrorReducer,
  project: projectReducer,
  global: globalReducer
});
