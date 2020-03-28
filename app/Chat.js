import React from "react";
import Socket from "./Socket";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: []
    };

    Socket.on("user-connected", username => {
      const message = `${username} connected`;
      const msgObj = { message, username };
      this.setState({ messages: [...this.state.messages, msgObj] });
    });

    Socket.on("user-disconnected", username => {
      const message = `${username} disconnected`;
      const msgObj = { message, username };
      this.setState({ messages: [...this.state.messages, msgObj] });
    });

    Socket.on("receive-message", msgObj => {
      this.setState({ messages: [...this.state.messages, msgObj] });
    });

    this.sendMessage = event => {
      event.preventDefault();
      Socket.emit(
        "send-chat-message",
        this.state.message,
        this.props.username,
        this.props.couchId
      );
      this.setState({ message: "" });
    };
  }

  componentWillUnmount() {
    Socket.emit("disconnecting");
  }

  render() {
    return (
      <div>
        <h3>Share this Couch ID: {this.props.couchId}</h3>
        <ul id="messages">
          {this.state.messages.map(message => {
            return (
              <li>
                {message.username}: {message.message}
              </li>
            );
          })}
        </ul>
        <form id="chat-form" action="">
          <input
            type="text"
            placeholder="Message"
            value={this.state.message}
            onChange={ev => this.setState({ message: ev.target.value })}
            className="form-control"
          />
          <button onClick={this.sendMessage}>Send</button>
        </form>
      </div>
    );
  }
}
