import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Chat from "./chat/Chat";

export class Intro extends Component {
  state = {};

  render() {
    return (
      <div className="portalIntroWrapper">
        <h3>
          Welcome,{" "}
          {this.props.user &&
            this.props.user.name !== "undefined" &&
            this.props.user.name.split(" ")[0]}
          !
        </h3>
        <br />
        <br />
        <Chat />
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
