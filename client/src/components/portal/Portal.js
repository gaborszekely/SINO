import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FeatherIcon from "feather-icons-react";
import Events from "./Events";
import Intro from "./Intro";
import { getUserInfo } from "../../actions/userActions";

class Portal extends Component {
  state = {};

  componentDidMount() {
    this.props.getUserInfo(this.props.userId);
  }

  render() {
    return (
      <div className="topExtraMargin" id="portal">
        <div className="portalWrapper">
          <Intro />
          <Events />
        </div>
      </div>
    );
  }
}

Portal.propTypes = {
  user: PropTypes.object.isRequired,
  userId: PropTypes.string,
  flashMessage: PropTypes.string.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user.sub,
  user: state.user,
  flashMessage: state.flash.message,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getUserInfo }
)(Portal);
