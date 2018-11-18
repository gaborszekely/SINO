/* DEPENDENCIES */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import ScrollToTop from "react-router-scroll-top";

// ROUTES
import AppNavbar from "./AppNavbar";
import Home from "./home/Home";
import About from "./home/About";
import Services from "./home/Services";
import Contact from "./home/Contact";
import FAQ from "./home/FAQ";
import LoginUser from "./user/LoginUser";
import LoginUser1 from "./user/LoginUser1";
import ChangePassword from "./user/ChangePassword";
// import UserPortal from "./user/UserPortal";
import Portal from "./portal/Portal";
import Error from "./Error";
import ReactFinalForm2 from "./user/register";
import MapContainer from "../components/user/Maps";
import NewMap from "../components/user/MapsNew";
import GoogleMap from "../components/user/map/GoogleMap";
import Footer from "./Footer";

// OTHER
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { setCurrentUser } from "../actions/authActions";
import store from "../store";

/* COMPONENT */

class Main extends Component {
  componentDidMount() {
    // THIS LOGS
    if (sessionStorage.jwt_token) {
      // HEADER BEING SET
      setAuthorizationToken(sessionStorage.jwt_token);
      store.dispatch(setCurrentUser(jwt.decode(sessionStorage.jwt_token)));
    }
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <ScrollToTop>
            <AppNavbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/services" exact component={Services} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/faq" exact component={FAQ} />
              <Route path="/maps" exact component={NewMap} />
              <Route path="/maps2" exact component={MapContainer} />
              <Route path="/maps3" exact component={GoogleMap} />
              <Route
                path="/user/portal"
                exact
                // component={Portal}
                render={() =>
                  this.props.isAuthenticated ? <Portal /> : <Redirect to="/" />
                }
              />
              <Route path="/logout" exact render={() => <Redirect to="/" />} />

              <Route path="/register" exact component={ReactFinalForm2} />
              <Route path="/login" exact component={LoginUser} />
              <Route path="/login1" exact component={LoginUser1} />
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
          </ScrollToTop>
        </React.Fragment>
      </Router>
    );
  }
}

Main.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

/* EXPORTS */

export default connect(
  mapStateToProps,
  {}
)(Main);
