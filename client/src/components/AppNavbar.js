// Dependencies
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Offline } from "react-detect-offline";
import { Popconfirm, message } from "antd";
import FeatherIcon from "feather-icons-react";

// Logo Images
import logoIcon from "../assets/images/logo/website/icon.png";
import logoText from "../assets/images/logo/website/text.png";
import logoSubtext from "../assets/images/logo/website/subtext.png";

// JS files
import { logoutUser } from "../actions/authActions";
import OfflineMessage from "./OfflineMessage";

class AppNavbar extends Component {
  state = {};

  confirm = () => {
    this.props.logoutUser();
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
      // Opacity
      // document.getElementById("flex-wrapper").classList.add("trs");
      // Image size
      document.getElementById("logoIcon").classList.add("transform");
      document.getElementById("logoText").classList.add("grow");
      document.getElementById("logoSubtext").classList.add("removed");
      // Padding
      document.getElementById("top-row-logo").classList.add("trans");
    } else {
      // document.getElementById("flex-wrapper").classList.remove("trs");
      document.getElementById("logoIcon").classList.remove("transform");
      document.getElementById("logoText").classList.remove("grow");
      document.getElementById("logoSubtext").classList.remove("removed");
      document.getElementById("top-row-logo").classList.remove("trans");
    }
  };

  render() {
    const logoutText = "Are you sure you want to log out?";
    const { isAuthenticated } = this.props;
    return (
      <div className="navWrapper">
        <Offline>
          <OfflineMessage />
        </Offline>
        <nav id="flex-wrapper" className="flex-wrapper">
          {/* SINO LOGO @ TOP */}
          <div className="top-row-logo" id="top-row-logo">
            <NavLink to="/" exact>
              <div className="logoWrapper">
                <img
                  className="logoIcon"
                  id="logoIcon"
                  src={logoIcon}
                  alt="Sino Logo"
                />
                <div className="logoRightWrapper">
                  <img
                    className="logoText"
                    id="logoText"
                    src={logoText}
                    alt="Sino Logo"
                  />
                  <img
                    className="logoSubtext"
                    id="logoSubtext"
                    src={logoSubtext}
                    alt="Sino Logo"
                  />
                </div>
              </div>
            </NavLink>
          </div>
          {/* NAVIGATION BAR */}
          <div className="top-row-links">
            <ul className="navbar">
              <li>
                <NavLink
                  to="/"
                  exact
                  activeStyle={{ color: "#6dacd5", textDecoration: "none" }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  exact
                  activeStyle={{ color: "#6dacd5", textDecoration: "none" }}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  exact
                  activeStyle={{ color: "#6dacd5", textDecoration: "none" }}
                >
                  Services
                </NavLink>
              </li>
              {!isAuthenticated && (
                <li>
                  <NavLink
                    to="/register"
                    exact
                    activeStyle={{ color: "#6dacd5", textDecoration: "none" }}
                  >
                    Register
                  </NavLink>
                </li>
              )}
              <li className="toHide">
                <NavLink
                  to="/contact"
                  exact
                  activeStyle={{ color: "#6dacd5", textDecoration: "none" }}
                >
                  Contact Us
                </NavLink>
              </li>
              <li className="toHide">
                <NavLink
                  to="/faq"
                  exact
                  activeStyle={{ color: "#6dacd5", textDecoration: "none" }}
                >
                  FAQ
                </NavLink>
              </li>
              <li className="more-links">
                <span className="more-text">More</span>
                {/* <FeatherIcon icon="chevron-down" className="more-icon" /> */}
                <div className="more-links-popdown">
                  <div className="more-links-popdown-inner">
                    <ul>
                      <li>
                        <NavLink
                          to="/contact"
                          exact
                          activeStyle={{
                            color: "#6dacd5",
                            textDecoration: "none"
                          }}
                        >
                          Contact Us
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/faq"
                          exact
                          activeStyle={{
                            color: "#6dacd5",
                            textDecoration: "none"
                          }}
                        >
                          FAQ
                        </NavLink>
                      </li>
                      {isAuthenticated && (
                        <React.Fragment>
                          <li>
                            <NavLink
                              to="/user/portal"
                              exact
                              className="more-links-login"
                              activeStyle={{
                                color: "#6dacd5",
                                textDecoration: "none"
                              }}
                            >
                              User Portal
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/logout"
                              exact
                              className="more-links-login"
                              activeStyle={{
                                color: "#6dacd5",
                                textDecoration: "none"
                              }}
                            >
                              <Popconfirm
                                placement="bottomRight"
                                title={logoutText}
                                onConfirm={this.confirm}
                                okText="Yes"
                                cancelText="No"
                              >
                                Logout
                              </Popconfirm>
                            </NavLink>
                          </li>
                        </React.Fragment>
                      )}
                      {!isAuthenticated && (
                        <li>
                          <NavLink
                            to="/login"
                            exact
                            className="more-links-login"
                            activeStyle={{
                              color: "#6dacd5",
                              textDecoration: "none"
                            }}
                          >
                            Login
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="login-links">
            <ul>
              {isAuthenticated && (
                <React.Fragment>
                  <li>
                    <NavLink
                      to="/user/portal"
                      exact
                      className="right-buttons"
                      activeStyle={{ color: "#6dacd5", textDecoration: "none" }}
                    >
                      User Portal
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/logout"
                      exact
                      className="right-buttons"
                      activeStyle={{ color: "#6dacd5", textDecoration: "none" }}
                    >
                      <Popconfirm
                        placement="bottomRight"
                        title={logoutText}
                        onConfirm={this.confirm}
                        okText="Yes"
                        cancelText="No"
                      >
                        Logout
                      </Popconfirm>
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {!isAuthenticated && (
                <li>
                  <NavLink
                    to="/login"
                    exact
                    className="login-button right-buttons"
                    activeStyle={{ textDecoration: "none" }}
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="hamburger">
            <FeatherIcon icon="menu" className="hamburger-icon" />
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
