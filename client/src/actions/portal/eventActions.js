import axios from "axios";
import {
  COMPLETE_EVENT,
  MARK_IMPORTANT,
  ADD_EVENT,
  EDIT_EVENT,
  REMOVE_EVENT,
  GET_EVENTS
} from "../types";
import { addFlashMessage } from "../flashActions";
import { setItemsLoading } from "../../utils/loading";

// GET EVENTS
export const getEvents = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get(`/api/portal/events/global/get`)
    .then(res => {
      dispatch({ type: GET_EVENTS, payload: res.data });
      dispatch(setItemsLoading());
    })
    .catch(err => {
      dispatch(setItemsLoading());
      console.error(err.stack);
    });
};

// ADD EVENT
export const addUserEvent = eventId => dispatch => {
  dispatch(setItemsLoading());
  axios
    .post("/api/portal/events/user/add", eventId)
    .then(res => {
      dispatch(addFlashMessage("Success! Event has been added to your list."));
      dispatch({
        type: ADD_EVENT,
        payload: res.data.portal.events
      });
      dispatch(setItemsLoading());
    })
    .catch(err => {
      dispatch(
        addFlashMessage("Error - Could not add event. Please try again!")
      );
      dispatch(setItemsLoading());
      console.error(err.stack);
    });
};

// ADD EVENT
export const addCustomUserEvent = event => dispatch => {
  dispatch(setItemsLoading());
  axios
    .post("/api/portal/events/user/addCustom", event)
    .then(res => {
      dispatch(addFlashMessage("Success! Event has been added to your list."));
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      });
      dispatch(setItemsLoading());
    })
    .catch(err => {
      dispatch(
        addFlashMessage("Error - Could not add event. Please try again!")
      );
      dispatch(setItemsLoading());
      console.error(err.stack);
    });
};

// DELETE EVENT
export const removeUserEvent = eventId => dispatch => {
  dispatch(setItemsLoading());
  axios
    .delete(`/api/portal/events/user/remove/${eventId}`)
    .then(res => {
      if (res && typeof res === "object" && res !== {}) {
        dispatch(addFlashMessage("Event has been removed."));
        dispatch({ type: REMOVE_EVENT, payload: eventId });
        dispatch(setItemsLoading());
      } else {
        dispatch(
          addFlashMessage("Error - Could not remove event. Please try again!")
        );
        dispatch(setItemsLoading());
      }
    })
    .catch(err => {
      dispatch(
        addFlashMessage("Error - Could not remove event. Please try again!")
      );
      dispatch(setItemsLoading());
      console.error(err.stack);
    });
};

// EDIT EVENT
export const editUserEvent = (id, edit) => dispatch => {
  // Make API Call
  dispatch({
    type: EDIT_EVENT,
    payload: edit,
    id
  });
};

// COMPLETE EVENT
export const completeUserEvent = id => dispatch => {
  // Make API Call
  dispatch({
    type: COMPLETE_EVENT,
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
