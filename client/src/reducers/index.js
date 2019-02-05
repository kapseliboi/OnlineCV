import { combineReducers } from "redux";
import authReducer from "./authReducers";
import loginErrorReducer from "./errorReducers";
import dataReducer from "./dataReducer";

export default combineReducers({
  auth: authReducer,
  loginErrors: loginErrorReducer,
  data: dataReducer
});
