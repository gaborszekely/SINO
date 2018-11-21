import React, { Component } from "react";
import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUserEvent } from "../../actions/portal/eventActions";
import Loader from "../../assets/images/loader_1.gif";
import store from "../../store";
import { addFlashMessage } from "../../actions/flashActions";
import { message } from "antd";

class SingleEvent extends Component {
  state = {
    item: ""
  };
  addItem = async eventId => {
    if (this.props.userEvents.includes(eventId)) {
      message.error("Item already exists!");
      // store.dispatch(addFlashMessage("Item already exists!"));
    } else {
      this.setState({ item: eventId });
      this.props.addUserEvent(eventId);
    }
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
        {this.props.loading && this.state.item.length > 1 && (
          <span className="iconWrapper">
            <img src={Loader} className="loaderIcon" alt="Loader" />
          </span>
        )}
      </li>
    );
  }
}

SingleEvent.propTypes = {
  addUserEvent: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  userEvents: PropTypes.array,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user.sub,
  loading: state.loading.loading,
  userEvents: state.user.user.events
});

export default connect(
  mapStateToProps,
  { addUserEvent }
)(SingleEvent);
