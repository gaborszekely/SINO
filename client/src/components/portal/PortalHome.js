import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserInfo } from "../../actions/userActions";

class PortalHome extends Component {
  render() {
    return <div />;
  }
}

PortalHome.propTypes = {
  user: PropTypes.object.isRequired,
  userId: PropTypes.string,
  getUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user.sub,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserInfo }
)(PortalHome);
