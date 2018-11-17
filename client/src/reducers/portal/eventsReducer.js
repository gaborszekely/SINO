import {
  COMPLETE_EVENT,
  MARK_IMPORTANT,
  ADD_EVENT,
  EDIT_EVENT,
  REMOVE_EVENT,
  GET_EVENTS,
  ITEMS_LOADING
} from "../../actions/types";

let initialState = {
  events: [],
  userCustomEvents: []
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload
      };

    // NOTE - COMPLETE!
    case EDIT_EVENT:
      return state.map(item =>
        item.id === action.id
          ? Object.assign({}, item, { name: action.payload })
          : item
      );

    case COMPLETE_EVENT:
      return {
        ...state,
        events: state.events.map(item =>
          item.id === action.id
            ? Object.assign({}, item, { completed: !item.completed })
            : item
        )
      };

    case MARK_IMPORTANT:
      return {
        ...state,
        events: state.events.map(item =>
          item.id === action.id
            ? Object.assign({}, item, { important: !item.important })
            : item
        )
      };

    default:
      return state;
  }
}
