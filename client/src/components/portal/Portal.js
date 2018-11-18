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

  createFlashMessage = message => {
    if (document.querySelector(".flashTest")) {
      document
        .querySelector(".flashTest")
        .parentNode.removeChild(document.querySelector(".flashTest"));
    }

    // Parent Flash
    let newMessage = document.createElement("div");
    const node = document.createTextNode(message);
    newMessage.appendChild(node);

    // "X" Button
    let closeButton = document.createElement("span");
    const x = document.createTextNode("x");
    closeButton.appendChild(x);
    closeButton.onclick = this.hideMessage;
    closeButton.classList.add("closeButton");
    newMessage.appendChild(closeButton);
    newMessage.classList.add("flashTest");
    const parent = document.getElementById("portal");
    parent.appendChild(newMessage);
  };

  hideMessage = () => {
    const flash = document.querySelector(".flashTest");
    flash.parentNode.removeChild(flash);
    // if (flash.classList.contains("hidden")) {
    //   flash.classList.remove("hiddden");
    // } else {
    //   flash.classList.add("hidden");
    // }
  };

  render() {
    return (
      <div className="topExtraMargin" id="portal">
        {this.props.flashMessage.length > 0 &&
          this.createFlashMessage(this.props.flashMessage)}
        {/* (
          <div className="flashTest">
            {this.props.flashMessage}
            <FeatherIcon
              icon="x"
              className="addButton feather"
              onClick={() => {
                this.hideMessage();
              }} 
            />
          </div>
        )} */}
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
