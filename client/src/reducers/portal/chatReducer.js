import { GET_MESSAGES, SEND_MESSAGE } from "../../actions/types";

const initialState = {
  messages: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: state.messages.push({
          author: action.payload.author,
          content: action.payload.content,
          date: new Date().getDate()
        })
      };
    default:
      return state;
  }
}
