import React, { Component } from "react";
import "./css/style.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import AppNavbar from "./components/AppNavbar";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import LoggedIn from "./components/LoggedIn";
import Error from "./components/Error";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import { setCurrentUser } from "./actions/authActions";
import jwt from "jsonwebtoken";

class App extends Component {
  render() {
    if (sessionStorage.jwt_token) {
      setAuthorizationToken(sessionStorage.jwt_token);
      store.dispatch(setCurrentUser(jwt.decode(sessionStorage.jwt_token)));
    }

    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <AppNavbar />
            <Switch>
              <Route path="/" component={LoggedIn} exact />
              <Route path="/login" component={LoginUser} />
              <Route path="/register" component={RegisterUser} />
              <Route component={Error} />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
