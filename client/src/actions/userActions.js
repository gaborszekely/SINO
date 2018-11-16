import { GET_USER_INFO } from "./types";
import axios from "axios";

export const updateUserInfo = (id, info) => dispatch => {
  axios.put(`/api/users/update/${id}`, info).then(res => console.log(res));
  //   dispatch({
  //     type: UPDATE_USER_INFO,
  //     payload: res.data
  //   })
  // );
};

export const getUserInfo = id => dispatch => {
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
    })
    .catch(err => console.log(err));
};
