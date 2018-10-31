import { SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import jwt from "jsonwebtoken";

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
  // Set up newUser
  // Connect to backend API
  // Send registration data
  // Get back JWT token
  // Save JWT token in sessionStorage
  // Send isAuthenticated data to userReducers
  // const newUser = {
  //   name: {
  //     firstName: userInfo.firstName,
  //     lastName: userInfo.lastName
  //   },
  //   email: userInfo.email,
  //   password: userInfo.password,
  //   address: {
  //     street: userInfo.street,
  //     unit: userInfo.unit,
  //     city: userInfo.city,
  //     state: userInfo.state,
  //     zip: userInfo.zip,
  //     country: userInfo.country
  //   },
  //   phone: userInfo.phone,
  //   school: userInfo.school,
  //   edu_status: userInfo.edu_status,
  //   graduation: {
  //     month: userInfo.month,
  //     year: userInfo.year
  //   }
  // };
  axios.post("/api/users/register", userInfo).then(res => {
    const token = res.data.token;
    if (typeof Storage !== "undefined") {
      sessionStorage.setItem("jwt_token", token);
      setAuthorizationToken(token);
    }
    dispatch(setCurrentUser(jwt.decode(token)));
  });
};

/*
 * LOGIN USER
 *
 */

export const loginUser = info => dispatch => {
  // Connect to API
  // Send login data
  // Get back JSON Webtoken
  // Store token in browser's local storage
  // Send response to reducer
  axios.post("/api/users/login", info).then(res => {
    const token = res.data.token;
    if (typeof Storage !== "undefined") {
      sessionStorage.setItem("jwt_token", token);
      setAuthorizationToken(token);
    }
    dispatch(setCurrentUser(jwt.decode(token)));
  });
};
