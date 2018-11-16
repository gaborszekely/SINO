import { SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt from "jsonwebtoken";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { addFlashMessage } from "./flashActions";

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
  axios.post("/api/users/register", userInfo).then(res => {
    // Set token
    const token = res.data.token;
    if (typeof Storage !== "undefined") {
      sessionStorage.setItem("jwt_token", token);
      setAuthorizationToken(token);
    }
    dispatch(setCurrentUser(jwt.decode(token)));
    dispatch(
      addFlashMessage(
        "Registration complete! Please confirm your email address."
      )
    );
  });
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
      dispatch(addFlashMessage("Success! You are now signed in successfully."));
    })
    .catch(err => {
      dispatch(addFlashMessage(`Error - Unable to sign in! ${err}`));
    });
};

export const logoutUser = () => dispatch => {
  let r = window.confirm("Are you sure?");
  if (r) {
    sessionStorage.clear();
    // this.props.history.push("/");
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
    dispatch(addFlashMessage("You have been logged out"));
  }
};
