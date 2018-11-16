import {
  COMPLETE_EVENT,
  MARK_IMPORTANT,
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  GET_EVENTS,
  ITEMS_LOADING
} from "../../actions/types";

let initialState = {
  loading: false,
  events: []
};

export default function events(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        loading: false,
        events: action.payload
      };

    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload]
      };

    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(item => item.id !== action.id)
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

    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
