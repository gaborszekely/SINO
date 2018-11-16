import { ADD_FLASH_MESSAGE } from "../actions/types";

const initialState = {
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
}
