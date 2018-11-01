import React, { Component } from "react";
import Logo from "../images/logo/logo.png";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";

class AppNavbar extends Component {
  state = {};

  render() {
    return (
      <div>
        <nav id="flex-wrapper">
          {/* SINO LOGO @ TOP */}
          <div className="top-row-logo" id="top-row-logo">
            <NavLink to="/" exact>
              <img
                className="logo-img"
                id="logo-img"
                src={Logo}
                alt="Sino Medical Institute"
              />
            </NavLink>
          </div>
          {/* NAVIGATION BAR */}
          <div className="top-row-links">
            <ul className="navbar">
              <li>
                <NavLink to="/" exact activeStyle={{ color: "#6dacd5" }}>
                  Home
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/services">Our Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact Us</NavLink>
              </li>
              <li>
                <NavLink to="/faq">FAQ</NavLink>
              </li> */}
              {this.props.isAuthenticated && (
                <React.Fragment>
                  <li>
                    <NavLink
                      to="/user/portal"
                      exact
                      activeStyle={{ color: "#6dacd5" }}
                    >
                      User Portal
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/logout"
                      exact
                      activeStyle={{ color: "#6dacd5" }}
                      onClick={this.props.logoutUser}
                    >
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {!this.props.isAuthenticated && (
                <React.Fragment>
                  <li>
                    <NavLink
                      to="/register"
                      exact
                      activeStyle={{ color: "#6dacd5" }}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      exact
                      activeStyle={{ color: "#6dacd5" }}
                    >
                      Login
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AppNavbar);
