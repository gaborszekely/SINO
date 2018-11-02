import axios from "axios";

export const validateEmail = values => {
  axios.get("/api/users/validateEmail").then(res => {
    if (res.includes(values.email)) {
      throw { username: "Email address is taken" };
    }
  });
};
