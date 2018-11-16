import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import flashReducer from "./flashReducer";
import eventsReducer from "./portal/eventsReducer";

const rootReducer = combineReducers({
  flash: flashReducer,
  auth: authReducer,
  user: userReducer,
  event: eventsReducer
});

export default rootReducer;
