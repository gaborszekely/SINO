import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { reducer as formReducer } from "redux-form";
import flashMessages from "./flashMessages";

const rootReducer = combineReducers({
  flashMessages,
  form: formReducer,
  auth: authReducer,
  user: userReducer
});

export default rootReducer;
