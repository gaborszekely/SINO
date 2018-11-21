import { SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt from "jsonwebtoken";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { addFlashMessage } from "./flashActions";
import { message } from "antd";

/*
 * SET CURRENT USER IN REDUCER
 *
 */

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

/*
 * REGISTER NEW USER
 *
 */

export const addUser = userInfo => dispatch => {
  // Update database
  axios
    .post("/api/users/register", userInfo)
    .then(res => {
      // Set token
      const token = res.data.token;
      if (typeof Storage !== "undefined") {
        sessionStorage.setItem("jwt_token", token);
        setAuthorizationToken(token);
      }
      dispatch(setCurrentUser(jwt.decode(token)));
      message.success(
        "Registration complete! Please confirm your email address."
      );
      // dispatch(
      //   addFlashMessage(
      //     "Registration complete! Please confirm your email address."
      //   )
      // );
    })
    .catch(err =>
      message.error(`Error - Could not register user. ${JSON.stringify(err)}`)
    );
};

/*
 * LOGIN USER
 *
 */

export const loginUser = info => dispatch => {
  axios
    .post("/api/users/login", info)
    .then(res => {
      const token = res.data.token;
      if (typeof Storage !== "undefined") {
        sessionStorage.setItem("jwt_token", token);
        setAuthorizationToken(token);
      }
      dispatch(setCurrentUser(jwt.decode(token)));
      message.success("Success! You are now signed in successfully.");
    })
    .catch(err => {
      message.error(`Error - Unable to sign in! ${JSON.stringify(err)}`);
    });
};

export const logoutUser = () => dispatch => {
  // let r = window.confirm("Are you sure?");
  // if (r) {
  sessionStorage.clear();
  // this.props.history.push("/");
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
  message.success("You have been looged out.");
};
