import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import io from "socket.io-client";
import { sendMessage, getMessages } from "../../../actions/portal/chatActions";

class Chat extends Component {
  state = {
    message: "",
    messages: []
  };

  constructor(props) {
    super(props);
    this.socket = io("localhost:5000");

    this.socket.on("RECEIVE_MESSAGE", data => {
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({ messages: [...this.state.messages, data] });
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const author = this.props.user.name_first + " " + this.props.user.name_last;
    this.socket.emit("SEND_MESSAGE", {
      author,
      content: this.state.message,
      date: new Date()
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h3>Chat Here</h3>
        <div className="chat__messages">
          {this.state.messages.map(message => {
            return (
              <div
                className="chat__message"
                key={message.author + message.date}
              >
                {message.author}: {message.content}
                <hr />
              </div>
            );
          })}
        </div>
        <div className="chat__message-input">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
              placeholder="Enter message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.object.isRequired,
  userId: PropTypes.string,
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.chat.messages,
  userId: state.auth.user.sub,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { sendMessage, getMessages }
)(Chat);
