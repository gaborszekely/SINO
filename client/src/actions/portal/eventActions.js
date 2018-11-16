import axios from "axios";
import {
  COMPLETE_EVENT,
  MARK_IMPORTANT,
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  GET_EVENTS,
  ITEMS_LOADING
} from "../types";
import { addFlashMessage } from "../flashActions";

// GET EVENTS
export const getEvents = () => dispatch => {
  // dispatch(setItemsLoading());
  axios
    .get(`/api/portal/getGlobalEvents`)
    .then(res => dispatch({ type: GET_EVENTS, payload: res.data }));
};

// ADD EVENT
export const addUserEvent = (eventId, userId) => dispatch => {
  const data = { eventId, userId };
  axios
    .post("/api/portal/addUserEvent", data)
    .then(res => {
      console.log(res.data);
      dispatch(addFlashMessage("Success! Event has been added."));
      dispatch({
        type: ADD_EVENT,
        payload: res.data.portal.events
      });
    })
    .catch(err => {
      dispatch(
        addFlashMessage("Error - Could not add event. Please try again!")
      );
      console.error(err.stack);
    });
};

// ADD EVENT
export const addCustomEvent = event => dispatch => {
  axios
    .post("/api/...", event)
    .then(res =>
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      })
    )
    .catch(err => console.error(err.stack));
};

// EDIT EVENT
export const editEvent = (id, edit) => dispatch => {
  // Make API Call
  dispatch({
    type: EDIT_EVENT,
    payload: edit,
    id
  });
};

// COMPLETE EVENT
export const completeEvent = id => dispatch => {
  // Make API Call
  dispatch({
    type: COMPLETE_EVENT,
    id
  });
};

// DELETE EVENT
export const deleteEvent = id => dispatch => {
  // Make API Call
  dispatch({
    type: DELETE_EVENT,
    id
  });
};

// MARK IMPORTANT
export const markImportant = id => dispatch => {
  // Make API Call
  dispatch({
    type: MARK_IMPORTANT,
    id
  });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
