import React, { Component } from "react";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUserEvent } from "../../actions/portal/eventActions";

class SingleEvent extends Component {
  state = {};
  addItem = item => {
    console.log(`Adding "${item}"...`);
  };

  render() {
    const { id, name } = this.props;
    return (
      <li key={id} className="eventLi">
        {name}
        <span className="iconWrapper">
          <FeatherIcon
            icon="plus"
            className="addButton"
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
