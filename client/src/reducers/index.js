import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer
});

export default rootReducer;
