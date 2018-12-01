import { SEND_MESSAGE, SEND_PM, GET_MESSAGES } from "../types";
import { message } from "antd";
import { setItemsLoading } from "../../utils/loading";
import axios from "axios";

export const getMessages = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/portal/chat")
    .then(res => {
      dispatch({
        type: GET_MESSAGES,
        payload: res.data
      });
      dispatch(setItemsLoading());
    })
    .catch(err => {
      message.error("Could not load chat. Please try again.");
      console.error(err.stack);
      dispatch(setItemsLoading());
    });
};

export const sendMessage = (user, message) => dispatch => {
  dispatch(setItemsLoading());
  const data = { user, message };
  axios
    .post("/api/portal/chat/message", data)
    .then(() => {
      dispatch({
        type: SEND_MESSAGE,
        payload: data
      });
      dispatch(setItemsLoading());
    })
    .catch(err => {
      message.error("Could not send message. Please try again.");
      console.error(err.stack);
      dispatch(setItemsLoading());
    });
};

export const sendPM = (user, recipient, message) => dispatch => {
  dispatch(setItemsLoading());
  const data = { user, recipient, message };
  axios
    .post("/api/portal/chat/pm", data)
    .then(() => {
      dispatch({
        type: SEND_PM,
        payload: data
      });
      dispatch(setItemsLoading());
    })
    .catch(err => {
      message.error("Could not send private message. Please try again.");
      console.error(err.stack);
      dispatch(setItemsLoading());
    });
};
