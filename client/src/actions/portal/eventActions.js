import axios from "axios";
import {
  COMPLETE_EVENT,
  MARK_IMPORTANT,
  ADD_EVENT,
  EDIT_EVENT,
  REMOVE_EVENT,
  GET_EVENTS
} from "../types";
import { setItemsLoading } from "../../utils/loading";
import { message } from "antd";

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
      message.success("Event has been added!");
      dispatch({
        type: ADD_EVENT,
        payload: res.data.portal.events
      });
      dispatch(setItemsLoading());
    })
    .catch(err => {
      message.error("Event could not be added - Please try again.");
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
      message.success("Event has been added!");
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      });
      dispatch(setItemsLoading());
    })
    .catch(err => {
      message.error("Event could not be added. Please try again.");
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
        message.info("Event has been removed.");
        dispatch({ type: REMOVE_EVENT, payload: eventId });
        dispatch(setItemsLoading());
      } else {
        message.error("Event could not be removed. Please try again.");
        dispatch(setItemsLoading());
      }
    })
    .catch(err => {
      message.error("Event could not be removed. Please try again.");
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
