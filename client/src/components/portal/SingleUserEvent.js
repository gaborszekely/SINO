import React, { Component } from "react";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUserEvent } from "../../actions/portal/eventActions";

class SingleUserEvent extends Component {
  state = {};
  addItem = item => {
    console.log(`Adding "${item}"...`);
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
              this.addItem(id);
            }}
          />
        </span>
      </li>
    );
  }
}

SingleUserEvent.propTypes = {
  addUserEvent: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user.sub
});

export default connect(
  mapStateToProps,
  { addUserEvent }
)(SingleUserEvent);
