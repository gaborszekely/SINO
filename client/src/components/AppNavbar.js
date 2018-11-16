import React, { Component } from "react";
import Logo from "../assets/images/logo/logo.png";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
import { Offline, Online } from "react-detect-offline";
import OfflineMessage from "./OfflineMessage";
// import Icon from "@material-ui/core/Icon";
// import IconName from "@material-ui/icons/{icon-name-here}";
// import AccountCircle from "@material-ui/icons/AccountCircle";

class AppNavbar extends Component {
  state = {
    navHeight: 50
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 50) {
      // Add Opacity
      // document.getElementById("flex-wrapper").classList.add("trs");
      // Shrink Image
      document.getElementById("logo-img").classList.add("transform");
      // Change padding
      document.getElementById("top-row-logo").classList.add("trans");
    } else {
      // document.getElementById("flex-wrapper").classList.remove("trs");
      document.getElementById("logo-img").classList.remove("transform");
      document.getElementById("top-row-logo").classList.remove("trans");
    }
  };

  render() {
    return (
      <div className="navWrapper">
        <Offline>
          <OfflineMessage />
        </Offline>
        <nav id="flex-wrapper" className="flex-wrapper">
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
              <li>
                <NavLink to="/about" exact activeStyle={{ color: "#6dacd5" }}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  exact
                  activeStyle={{ color: "#6dacd5" }}
                >
                  Services
                </NavLink>
              </li>
              {!this.props.isAuthenticated && (
                <li>
                  <NavLink
                    to="/register"
                    exact
                    activeStyle={{ color: "#6dacd5" }}
                  >
                    Register
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/contact" exact activeStyle={{ color: "#6dacd5" }}>
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" exact activeStyle={{ color: "#6dacd5" }}>
                  FAQ
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="login-links">
            <ul className="navbar">
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
                    <NavLink to="/login" exact className="login-button">
                      {/* <AccountCircle style={loginIcon} /> */}
                      {/* <Icon className="login-circle">account_circle</Icon> */}
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
  { logoutUser },
  null,
  { pure: false }
)(AppNavbar);
