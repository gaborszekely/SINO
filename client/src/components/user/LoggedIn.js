import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class LoggedIn extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.checkForLogin = this.checkForLogin.bind(this);
  }

  checkForLogin() {
    if (this.props.isAuthenticated || sessionStorage.jwt_token) {
      return <p>User is logged in!</p>;
    } else {
      return <p>Please log in.</p>;
    }
  }

  render() {
    return (
      <div style={{ margin: "2em" }}>
        <h2>Welcome!</h2>
        <div className="loggedInBox">{this.checkForLogin()}</div>
      </div>
    );
  }
}

LoggedIn.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(LoggedIn);
