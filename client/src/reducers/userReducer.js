import { GET_USER_INFO } from "../actions/types";

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
    default:
      return state;
  }
}
