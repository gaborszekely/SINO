import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Home from "./home/Home";
import RegisterUser from "./user/RegisterUser";
import LoginUser from "./user/LoginUser";
import ChangePassword from "./user/ChangePassword";
import UserPortal from "./user/UserPortal";
import Error from "./Error";
import RegistrationForm from "./user/RegistrationForm";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { setCurrentUser } from "../actions/authActions";
import jwt from "jsonwebtoken";
import store from "../store";

class Main extends Component {
  componentDidMount() {
    if (sessionStorage.jwt_token) {
      setAuthorizationToken(sessionStorage.jwt_token);
      store.dispatch(setCurrentUser(jwt.decode(sessionStorage.jwt_token)));
    }
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          <AppNavbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/form" exact render={() => <RegistrationForm />} />
            <Route
              path="/user/portal"
              exact
              render={() =>
                this.props.isAuthenticated ? (
                  <UserPortal />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route path="/logout" exact render={() => <Redirect to="/" />} />
            <Route path="/register" exact component={RegisterUser} />
            <Route path="/login" exact component={LoginUser} />
            <Route
              path="/user/password"
              exact
              render={() =>
                this.props.isAuthenticated ? (
                  <ChangePassword />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route component={Error} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

Main.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  form: state.form // Optional, in case you want to extract data from the form
});

export default connect(mapStateToProps)(Main);
