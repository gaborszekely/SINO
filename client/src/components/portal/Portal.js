import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
      <div className="topMargin leftMargin">
        <center>
          <h2>User Portal</h2>
          {this.props.flashMessage.length > 0 && (
            <div className="flashMessage">{this.props.flashMessage}</div>
          )}
        </center>
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
  getUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user.sub,
  user: state.user,
  flashMessage: state.flash.message
});

export default connect(
  mapStateToProps,
  { getUserInfo }
)(Portal);
