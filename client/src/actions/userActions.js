import { GET_USER_INFO, UPDATE_USER_INFO } from "./types";
import axios from "axios";
import { message } from "antd";
import { setItemsLoading } from "../utils/loading";

export const subscribeUser = email => dispatch => {
  dispatch(setItemsLoading());
  axios
    .post("/api/users/subscribe", email)
    .then(res => {
      message.success("Success! You have been signed up for our mailing list.");
      dispatch(setItemsLoading());
    })
    .catch(err => {
      message.error(
        "Oh no! We were unable to sign you up. Please try again later."
      );
      console.error(err.stack);
      dispatch(setItemsLoading());
    });
};

export const updateUserInfo = (id, info) => dispatch => {
  dispatch(setItemsLoading());
  axios
    .put(`/api/users/update/${id}`, info)
    .then(res => {
      dispatch({
        type: UPDATE_USER_INFO,
        payload: res.data
      });
      message.success("Updated user info successfully.");
      dispatch(setItemsLoading());
    })
    .catch(err => {
      message.error("Could not update user info. Please try again!");
      dispatch(setItemsLoading());
    });
};

export const getUserInfo = id => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get(`/api/users/info/${id}`)
    .then(res => {
      const { firstName, lastName } = res.data.personal.name;
      const { email, isValidated, gender, dob, phone } = res.data.personal;
      const { street, city, state, zip, country } = res.data.personal.address;
      const {
        school,
        school_country,
        edu_status,
        edu_type
      } = res.data.education;
      const { month, year } = res.data.education.graduation;
      const { events, userEvents } = res.data.portal;

      const user = {
        name_first: firstName,
        name_last: lastName,
        email,
        isValidated,
        gender,
        dob,
        phone,
        address_street: street,
        address_city: city,
        address_state: state,
        address_zip: zip,
        address_country: country,
        school,
        school_country,
        edu_status,
        edu_type,
        grad_month: month,
        grad_year: year,
        events,
        userEvents
      };

      dispatch({
        type: GET_USER_INFO,
        payload: user
      });
      dispatch(setItemsLoading());
    })
    .catch(err => {
      console.log(err);
      message.error("Unable to fetch user info. Please try again!");
      dispatch(setItemsLoading());
    });
};
