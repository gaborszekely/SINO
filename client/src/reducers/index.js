import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import flashReducer from "./flashReducer";
import eventsReducer from "./portal/eventsReducer";
import loadingReducer from "./loadingReducer";
import chatReducer from "./portal/chatReducer";

const rootReducer = combineReducers({
  flash: flashReducer,
  auth: authReducer,
  user: userReducer,
  event: eventsReducer,
  loading: loadingReducer,
  chat: chatReducer
});

export default rootReducer;
