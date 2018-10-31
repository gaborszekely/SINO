import axios from "axios";

const setAuthorizationToken = token => {
  // If token iz provided, add "Authorization" header to every request after that
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // axios.defaults.headers.common = { "Authorization": `Bearer ${token}` };

    // If no token, remove Authorization header
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthorizationToken;
