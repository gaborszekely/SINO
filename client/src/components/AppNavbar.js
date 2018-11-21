import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Offline } from "react-detect-offline";
import { Popconfirm, message } from "antd";
import FeatherIcon from "feather-icons-react";

import Logo from "../assets/images/logo/Logo_smaller.png";
import { logoutUser } from "../actions/authActions";
import OfflineMessage from "./OfflineMessage";

class AppNavbar extends Component {
  state = {};

  confirm = () => {
    this.props.logoutUser();
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    document
      .querySelector(".more-links")
      .addEventListener("mouseover", this.moreHover);
    document
      .querySelector(".more-links")
      .addEventListener("mouseout", this.moreUnhover);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document
      .querySelector(".more-links")
      .removeEventListener("mouseover", this.moreHover);
    document
      .querySelector(".more-links")
      .addEventListener("mouseout", this.moreUnhover);
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

  moreHover = () => {
    const icon = document.querySelector(".more-icon");
    icon.classList.add("hovered");
  };

  moreUnhover = () => {
    const icon = document.querySelector(".more-icon");
    icon.classList.remove("hovered");
  };

  moreLinks = () => {
    const popdown = document.querySelector(".more-links-popdown");
    const moreLink = document.querySelector(".more-links");
    const icon = document.querySelector(".more-icon");

    popdown.classList.contains("opened")
      ? popdown.classList.remove("opened")
      : popdown.classList.add("opened");

    icon.classList.contains("opened")
      ? icon.classList.remove("opened")
      : icon.classList.add("opened");
  };

  render() {
    const text = "Are you sure you want to log out?";
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
              <li className="more-links" onClick={this.moreLinks}>
                <span className="more-text">More</span>
                <FeatherIcon icon="chevron-down" className="more-icon" />
                <div className="more-links-popdown">
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
                  </ul>
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
                      activeStyle={{ color: "#6dacd5", textDecoration: "none" }}
                    >
                      User Portal
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/logout"
                      exact
                      activeStyle={{ color: "#6dacd5", textDecoration: "none" }}
                    >
                      <Popconfirm
                        placement="bottomRight"
                        title={text}
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
                    className="login-button"
                    activeStyle={{ textDecoration: "none" }}
                  >
                    Login
                  </NavLink>
                </li>
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
