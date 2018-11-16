import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Intro extends Component {
  state = {};

  render() {
    return (
      <div className="portalIntroWrapper">
        <h3>Welcome, {this.props.user.name.split(" ")[0]}!</h3>
      </div>
    );
  }
}

Intro.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Intro);
