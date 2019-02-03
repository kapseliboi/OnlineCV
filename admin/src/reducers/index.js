import { combineReducers } from "redux";
import authReducer from "./authReducers";
import {loginErrorReducer, registerErrorReducer} from "./errorReducers";
import projectReducer from "./projectReducers";
import globalReducer from "./globalReducer";
import applicationReducer from "./applicationReducer";
import cvReducer from "./cvReducer";

export default combineReducers({
  auth: authReducer,
  loginErrors: loginErrorReducer,
  registerErrors: registerErrorReducer,
  project: projectReducer,
  global: globalReducer,
  application: applicationReducer,
  cv: cvReducer
});
