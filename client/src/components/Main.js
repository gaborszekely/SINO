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
import PortalHome from "./portal/PortalHome";
import Error from "./Error";
import RegistrationForm from "./user/register";
import MapContainer from "../components/user/Maps";
import NewMap from "../components/user/MapsNew";
import GoogleMap from "../components/user/map/GoogleMap";
import Footer from "./Footer";
import { PrivateRoute } from "./PrivateRoute";
import Loader from "../assets/images/loader_blue4.gif";

// OTHER
import setAuthorizationToken from "../utils/setAuthorizationToken";
import { setCurrentUser } from "../actions/authActions";
import store from "../store";

/* COMPONENT */
class Main extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    if (sessionStorage.jwt_token) {
      setAuthorizationToken(sessionStorage.jwt_token);
      store.dispatch(setCurrentUser(jwt.decode(sessionStorage.jwt_token)));
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { isAuthenticated, isLoading } = this.props;

    if (isLoading) {
      return (
        <div className="loadingPage">
          <img src={Loader} className="largeLoader" />
        </div>
      );
    } else {
      return (
        <Router>
          <React.Fragment>
            <ScrollToTop>
              <AppNavbar />
              <div className="topMargin">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/about" exact component={About} />
                  <Route path="/services" exact component={Services} />
                  <Route path="/contact" exact component={Contact} />
                  <Route path="/faq" exact component={FAQ} />
                  <Route path="/maps" exact component={NewMap} />
                  <Route path="/maps2" exact component={MapContainer} />
                  <Route path="/maps3" exact component={GoogleMap} />
                  <Route path="/user/portalhome" exact component={PortalHome} />
                  {/* <PrivateRoute path="/user/portal" exact component={Portal} /> */}
                  <Route
                    path="/user/portal"
                    exact
                    render={() =>
                      isAuthenticated ? <Portal /> : <Redirect to="/" />
                    }
                  />
                  <Route
                    path="/logout"
                    exact
                    render={() => <Redirect to="/" />}
                  />

                  <Route path="/register" exact component={RegistrationForm} />

                  <Route
                    path="/login"
                    exact
                    render={() =>
                      isAuthenticated ? (
                        <Redirect to="/user/portal" />
                      ) : (
                        <LoginUser />
                      )
                    }
                  />

                  <Route path="/login1" exact component={LoginUser1} />

                  {/* CHANGE PASSWORD */}
                  <Route
                    path="/user/password"
                    exact
                    render={() =>
                      isAuthenticated ? (
                        <ChangePassword />
                      ) : (
                        <Redirect to="/login" />
                      )
                    }
                  />

                  <Route component={Error} />
                </Switch>
              </div>
              <Footer />
            </ScrollToTop>
          </React.Fragment>
        </Router>
      );
    }
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
