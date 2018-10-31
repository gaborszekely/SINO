import React, { Component } from "react";
import Logo from "../images/logo/logo.png";
import { NavLink } from "react-router-dom";

class AppNavbar extends Component {
  state = {};
  render() {
    return (
      <div>
        <nav id="flex-wrapper">
          {/* SINO LOGO @ TOP */}
          <div className="top-row-logo" id="top-row-logo">
            <img
              className="logo-img"
              id="logo-img"
              src={Logo}
              alt="Sino Medical Institute"
            />
          </div>
          {/* NAVIGATION BAR */}
          <div className="top-row-links">
            <ul className="navbar">
              <li>
                <NavLink to="/">Home</NavLink>
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
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default AppNavbar;
