import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class LoginUser extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    isLoading: false
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { loginUser } = this.props;
    const userInfo = {
      email: this.state.email,
      password: this.state.password
    };
    await loginUser(userInfo);
    this.props.history.push("/user/portal");
    // this.context.router.history.push("/user/portal");
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={{ margin: "2em", marginTop: "7rem", textAlign: "center" }}>
        <h2>Login User</h2>
        <div class="login-box">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label className="login-label shrunk" onClick="">
                Email:
              </label>
              <input
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                autoComplete="off"
                className="login-input"
              />
            </div>
            <br />
            <div>
              <label className="login-label shrunk">Password:</label>
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                autoComplete="off"
                className="login-input"
              />
            </div>
            <br />
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

LoginUser.propTypes = {
  loginUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { loginUser }
)(LoginUser);
