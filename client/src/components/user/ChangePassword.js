import React, { Component } from "react";

class ChangePassword extends Component {
  state = {
    oldPassword: "",
    password: "",
    password2: ""
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("SUBMITTED!");
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div style={{ marginLeft: "2em" }}>
        <h2>Change Your Password</h2>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>Please enter old password:</label>
          <input
            type="password"
            name="oldPassword"
            value={this.state.oldPassword}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <label>Please enter new password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <label>Please repeat your password:</label>
          <input
            type="password"
            name="password2"
            value={this.state.password2}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <button type="submit">Update Password</button>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
