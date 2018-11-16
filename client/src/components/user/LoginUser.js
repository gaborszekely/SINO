import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class LoginUser extends Component {
  state = {
    email: "",
    password: "",
    remember: false,
    errors: {},
    isLoading: false
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
    // document.getElementById("testBtn").classList.remove("loading");
    this.setState({ email: "", password: "" });

    // this.props.history.push("/user/portal");
    // this.context.router.history.push("/user/portal");
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="topMargin centered">
        <h2>Login User</h2>
        {this.props.flashMessage.length > 0 && (
          <div className="flashMessage">{this.props.flashMessage}</div>
        )}

        <div className="Xlogin-container">
          <div className="Xlogin-box">
            <h3>Sign-In Here</h3>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label className="Xlogin-label">Email:</label>
                  <input
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Email Address"
                    className="Xlogin-input"
                  />
                  <NavLink
                    to="/user/reset"
                    className="link smallLink XloginLink"
                  >
                    Forgot Email Address?
                  </NavLink>
                </div>
                <br />
                <div>
                  <label className="Xlogin-label">Password:</label>
                  <input
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                    className="Xlogin-input"
                  />
                  <NavLink
                    to="/user/reset"
                    className="link smallLink XloginLink"
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
          <div className="Xlogin-info">
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
              <NavLink to="/register" className="Xloginpage-button signUpLink">
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
