import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./home/Home";
import LoginUser from "./user/LoginUser";
import ChangePassword from "./user/ChangePassword";
import UserPortal from "./user/UserPortal";
import Error from "./Error";
import ReactFinalForm2 from "./user/react-final-form2";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { setCurrentUser } from "../actions/authActions";
import jwt from "jsonwebtoken";
import store from "../store";

class Routes extends Component {
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

            <Route path="/register" exact component={ReactFinalForm2} />
            <Route path="/login" exact component={LoginUser} />
            {/* // render={() =>
              //   this.props.isAuthenticated ? (
              //     <Redirect to="/user/portal" />
              //   ) : (
              //     <LoginUser />
              //   )
              // } */}

            {/* CHANGE PASSWORD */}
            <Route
              path="/user/password"
              exact
              render={() =>
                this.props.isAuthenticated ? (
                  <ChangePassword />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route component={Error} />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

Routes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  form: state.form // Optional, in case you want to extract data from the form
});

export default connect(mapStateToProps)(Routes);
