import { GET_USER_INFO, ADD_EVENT, REMOVE_EVENT } from "../actions/types";

const initialState = {
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        user: action.payload
      };

    case ADD_EVENT:
      const newUser = {
        ...state.user,
        events: action.payload
      };
      return {
        ...state,
        user: newUser
        // user: state.user.map(user => user.events = action.payload)
      };

    case REMOVE_EVENT:
      const updatedUser = {
        ...state.user,
        events: state.user.events.filter(event => event !== action.payload)
      };
      return {
        ...state,
        user: updatedUser
      };
    default:
      return state;
  }
}
