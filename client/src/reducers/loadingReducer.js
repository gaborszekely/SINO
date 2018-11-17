import { ITEMS_LOADING } from "../actions/types";

const initialState = {
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ITEMS_LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    default:
      return state;
  }
}
