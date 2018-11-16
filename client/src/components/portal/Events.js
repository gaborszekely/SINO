import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getEvents,
  editEvent,
  deleteEvent,
  completeEvent,
  markImportant
} from "../../actions/portal/eventActions";
import SingleEvent from "./SingleEvent";

class Events extends PureComponent {
  state = {
    loaded: false,
    search: ""
  };

  componentDidMount() {
    this.props.getEvents();
    document.getElementById("defaultOpen").click();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  openTab = (e, tabName) => {
    let tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    e.currentTarget.className += " active";
  };

  render() {
    const { events } = this.props.events;
    const { search } = this.state;
    return (
      <div>
        <div className="portalEvents">
          <div className="tab">
            <button
              className="tablinks"
              onClick={e => {
                this.openTab(e, "user_events");
              }}
              id="defaultOpen"
            >
              My Events
            </button>
            <button
              className="tablinks"
              onClick={e => {
                this.openTab(e, "import_events");
              }}
            >
              Import Events
            </button>
            <button
              className="tablinks"
              onClick={e => {
                this.openTab(e, "custom_event");
              }}
            >
              Custom Event
            </button>
          </div>

          <div id="user_events" className="tabcontent">
            <div className="userEvents">
              <ul>
                <li>Event Name</li>
              </ul>
            </div>
          </div>

          <div id="import_events" className="tabcontent">
            <div className="portalEventsInner">
              <h4>Import Events: </h4>
              <input
                type="text"
                name="search"
                className="eventSearch"
                value={this.state.search}
                onChange={this.handleChange}
                placeholder="Search events..."
              />
              <div className="eventsList" id="eventsList">
                <div className="list">
                  <ul>
                    {events
                      .filter(item =>
                        item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map(item => (
                        <SingleEvent
                          key={item._id}
                          id={item._id}
                          name={item.name}
                        />
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="custom_event" className="tabcontent">
            <h3>Tokyo</h3>
            <p>Tokyo is the capital of Japan.</p>
          </div>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  getEvents: PropTypes.func.isRequired,
  filterEvents: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  user: state.user,
  events: state.event
});

export default connect(
  mapStateToProps,
  {
    getEvents,
    editEvent,
    deleteEvent,
    completeEvent,
    markImportant
  }
)(Events);
