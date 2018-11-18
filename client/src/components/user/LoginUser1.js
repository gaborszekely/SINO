import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class LoginUser1 extends Component {
  state = {
    email: "",
    password: "",
    remember: false,
    errors: {},
    isLoading: false,
    success: true,
    message: ""
  };

  componentDidMount() {
    let savedLogin = localStorage.getItem("saved_login");
    if (savedLogin !== "undefined") {
      this.setState({ email: savedLogin });
    }

    const btn = document.getElementById("testBtn");
    const close = document.querySelector(".close");
    btn.addEventListener("click", this.connect);
    close.addEventListener("click", this.closeMessage);
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

  connect = () => {
    const btn = document.getElementById("testBtn");
    btn.classList.add("loading");
    btn.removeEventListener("click", this.connect);
    setTimeout(this.misteryMessage, 2000);
  };

  misteryMessage = () => {
    const btn = document.getElementById("testBtn");
    this.setState({ message: this.state.success ? "success" : "error" });
    document
      .querySelector(`.message-${this.state.message}`)
      .classList.add("active");
    setTimeout(function() {
      btn.classList.remove("loading");
    }, 500);
    this.setState({ success: this.state.success });
  };

  closeMessage = () => {
    const btn = document.getElementById("testBtn");
    document
      .querySelector(`.message-${this.state.message}`)
      .classList.remove("active");
    btn.addEventListener("click", this.connect);
  };

  render() {
    return (
      <div className="topMargin centered">
        <h2>Login User</h2>
        {this.props.flashMessage.length > 0 && (
          <center>
            <div className="flashMessage">{this.props.flashMessage}</div>
          </center>
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
              </form>
              <br />
              <br />
              <br />
              <div className="btn" id="testBtn">
                <button type="submit">Log In</button>
              </div>
              <div>
                <div className="message message-success">
                  <div className="title">Success!</div>
                  <div className="msg">
                    Your have been logged in successfully!
                    <br />
                    Please procceed to the User Portal.
                  </div>
                  <div className="close">
                    <svg>
                      <use xlinkHref="#close" />
                    </svg>
                  </div>
                </div>
                <div className="message message-error">
                  <div className="title">Something went wrong</div>
                  <div className="msg">
                    An error occurred during activation
                    <br />
                    Please try again
                  </div>
                  <div className="close">
                    <svg>
                      <use xlinkHref="#close" />
                    </svg>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ display: "none" }}
                >
                  <symbol id="close" viewBox="0 0 18 18">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="#FFFFFF"
                      d="M9,0.493C4.302,0.493,0.493,4.302,0.493,9S4.302,17.507,9,17.507
			S17.507,13.698,17.507,9S13.698,0.493,9,0.493z M12.491,11.491c0.292,0.296,0.292,0.773,0,1.068c-0.293,0.295-0.767,0.295-1.059,0
			l-2.435-2.457L6.564,12.56c-0.292,0.295-0.766,0.295-1.058,0c-0.292-0.295-0.292-0.772,0-1.068L7.94,9.035L5.435,6.507
			c-0.292-0.295-0.292-0.773,0-1.068c0.293-0.295,0.766-0.295,1.059,0l2.504,2.528l2.505-2.528c0.292-0.295,0.767-0.295,1.059,0
			s0.292,0.773,0,1.068l-2.505,2.528L12.491,11.491z"
                    />
                  </symbol>
                </svg>
              </div>
              {/* <div className="XbuttonContainer">
                  <button type="submit" className="Xloginpage-button">
                    Log In
                  </button>
                </div> */}
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

LoginUser1.propTypes = {
  loginUser: PropTypes.func.isRequired,
  flashMessage: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  flashMessage: state.flash.message
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginUser1);
