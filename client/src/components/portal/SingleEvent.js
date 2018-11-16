import React, { Component } from "react";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUserEvent } from "../../actions/portal/eventActions";

class SingleEvent extends Component {
  state = {};
  addItem = eventId => {
    console.log(`Adding item "${eventId}" for user ${this.props.userId}`);
    this.props.addUserEvent(eventId, this.props.userId);
  };

  render() {
    const { id, name, date } = this.props;
    return (
      <li key={id} className="eventLi">
        {name}
        <br />
        <span className="eventDate">{date}</span>
        <span className="iconWrapper">
          <FeatherIcon
            icon="plus"
            className="addButton feather"
            onClick={() => {
              this.addItem(id);
            }}
          />
        </span>
      </li>
    );
  }
}

SingleEvent.propTypes = {
  addUserEvent: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user.sub
});

export default connect(
  mapStateToProps,
  { addUserEvent }
)(SingleEvent);
