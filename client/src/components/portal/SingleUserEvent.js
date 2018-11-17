import React, { Component } from "react";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeUserEvent } from "../../actions/portal/eventActions";

class SingleUserEvent extends Component {
  state = {};
  removeItem = item => {
    this.props.removeUserEvent(item);
  };

  render() {
    const { id, name } = this.props;
    return (
      <li key={id} className="eventLi">
        <FeatherIcon
          icon="calendar"
          className="feather calendarButton"
          onClick={() => {
            this.addItem(id);
          }}
        />
        {name}
        <span className="iconWrapper">
          <FeatherIcon
            icon="chevron-down"
            className="feather addButton"
            onClick={() => {
              console.log(`Expanding item "${id}"...`);
            }}
          />
        </span>
        <span className="iconWrapper">
          <FeatherIcon
            icon="minus"
            className="feather addButton"
            onClick={() => {
              this.removeItem(id);
            }}
          />
        </span>
      </li>
    );
  }
}

SingleUserEvent.propTypes = {
  removeUserEvent: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user.sub
});

export default connect(
  mapStateToProps,
  { removeUserEvent }
)(SingleUserEvent);
