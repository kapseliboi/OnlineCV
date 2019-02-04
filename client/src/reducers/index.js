import { combineReducers } from "redux";
import authReducer from "./authReducers";
import {loginErrorReducer, registerErrorReducer} from "./errorReducers";
import dataReducer from "./dataReducer";

export default combineReducers({
  auth: authReducer,
  loginErrors: loginErrorReducer,
  registerErrors: registerErrorReducer,
  data: dataReducer
});
