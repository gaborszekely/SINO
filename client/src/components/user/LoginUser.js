import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { message } from "antd";

class LoginUser extends Component {
  state = {
    email: "",
    password: "",
    remember: false
  };

  componentDidMount() {
    let savedLogin = localStorage.getItem("saved_login");
    if (savedLogin !== "undefined") {
      this.setState({ email: savedLogin });
    }
  }

  componentDidUpdate() {
    if (this.props.flashMessage.length > 0) {
      document.getElementById("testBtn").classList.remove("loading");
      message.success(this.props.flashMessage);
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    // Set saved login
    document.getElementById("testBtn").classList.add("loading");
    if (this.state.remember && this.state.email.length > 0) {
      localStorage.setItem("saved_login", this.state.email);
    }

    const { loginUser } = this.props;
    const userInfo = {
      email: this.state.email,
      password: this.state.password
    };
    await loginUser(userInfo);
    this.setState({ email: "", password: "" });

    this.props.history.push("/user/portal");
    // this.context.router.history.push("/user/portal");
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="topExtraMargin centered">
        {/* {this.props.flashMessage.length > 0 && this.success} */}

        <div className="login-container">
          <div className="login-box">
            <h3>Sign-In Here</h3>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label className="login-label">Email:</label>
                  <input
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Email Address"
                    className="login-input"
                  />
                  <NavLink
                    to="/user/reset"
                    className="link smallLink loginLink"
                  >
                    Forgot Email Address?
                  </NavLink>
                </div>
                <br />
                <div>
                  <label className="login-label">Password:</label>
                  <input
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                    className="login-input"
                  />
                  <NavLink
                    to="/user/reset"
                    className="link smallLink loginLink"
                  >
                    Forgot Password?
                  </NavLink>
                </div>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="remember"
                    onChange={this.handleChange}
                    value={this.state.remember}
                  />
                  <span
                    className="rememberText"
                    style={{ marginBottom: "50px" }}
                  >
                    Remember Username?
                  </span>
                </label>
                <br />
                <br />
                <br />
                <div className="btn" id="testBtn">
                  <button type="submit">Log In</button>
                </div>
                {/* <div className="XbuttonContainer">
                  <button type="submit" className="Xloginpage-button">
                    Log In
                  </button>
                </div> */}
              </form>
            </div>
          </div>
          <div className="login-info">
            <h3>Registration</h3>
            <br />
            With a Free Account, you can:
            <br />
            <ul>
              <li>Browse rotations</li>
              <li>Prepare for your licensing exam</li>
              <li>Track important dates</li>
            </ul>
            <br />
            <div>
              <NavLink to="/register" className="loginpage-button signUpLink">
                Sign up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginUser.propTypes = {
  loginUser: PropTypes.func.isRequired,
  flashMessage: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  flashMessage: state.flash.message
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginUser);
