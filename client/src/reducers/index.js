import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import flashReducer from "./flashReducer";
import eventsReducer from "./portal/eventsReducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({
  flash: flashReducer,
  auth: authReducer,
  user: userReducer,
  event: eventsReducer,
  loading: loadingReducer
});

export default rootReducer;
