import { GET_USER_INFO, UPDATE_USER_INFO } from "./types";
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
      // console.log(res);
      const user = {
        name_first: res.data.name.firstName,
        name_last: res.data.name.lastName,
        email: res.data.email,
        address_street: res.data.address.street,
        address_unit: res.data.address.unit,
        address_city: res.data.address.city,
        address_state: res.data.address.state,
        address_zip: res.data.address.zip,
        address_country: res.data.address.country,
        phone: res.data.phone,
        school: res.data.school,
        edu_status: res.data.edu_status,
        grad_month: res.data.graduation.month,
        grad_year: res.data.graduation.year
      };
      dispatch({
        type: GET_USER_INFO,
        payload: user
      });
    })
    .catch(err => console.log(err));
};
