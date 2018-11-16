import axios from "axios";

const setAuthorizationToken = token => {
  // If token is provided, add "Authorization" header to every request after that
  if (token) {
    // HEADER BEING SET
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // axios.defaults.headers.common = { "Authorization": `Bearer ${token}` };

    // If no token, remove Authorization header
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthorizationToken;
