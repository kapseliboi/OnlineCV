import { combineReducers } from "redux";
import authReducer from "./authReducers";
import {loginErrorReducer, registerErrorReducer} from "./errorReducers";

export default combineReducers({
  auth: authReducer,
  loginErrors: loginErrorReducer,
  registerErrors: registerErrorReducer
});
