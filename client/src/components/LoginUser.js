import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class LoginUser extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    isLoading: false
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { loginUser } = this.props;
    const userInfo = {
      email: this.state.email,
      password: this.state.password
    };
    loginUser(userInfo);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div style={{ margin: "2em" }}>
        <h2>Login User</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email:</label>
            <br />
            <input
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Enter email..."
            />
          </div>
          <br />
          <div>
            <label>Password:</label>
            <br />
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Enter password..."
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
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
