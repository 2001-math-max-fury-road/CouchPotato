import React from "react";
import socketIOClient from "socket.io-client";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      couchId: "",
      username: "place holder",
      message: "",
      messages: []
    };
    this.socket = socketIOClient(`http://localhost:3000/${this.state.couchId}`);
    this.socket.on("chat-message", message => {
      // addMessage(msg);
      console.log("receiving message", message);
      this.setState({ messages: [...this.state.messages, message] });
    });
    this.socket.on("new-user", username => {
      this.socket.join(this.state.couchId);
      const msg = `${username} connected`;
      this.setState({ messages: [...this.state.messages, msg] });
    });
    this.socket.on("disconnect", username => {
      const msg = `${username} disconnected`;
      this.setState({ messages: [...this.state.messages, msg] });
    });

    // const addMessage = msg => {
    //   this.setState({ messages: [...this.state.messages, msg] });
    // };

    this.sendMessage = event => {
      event.preventDefault();
      this.socket.emit(
        "send-chat-message",
        this.state.couchId,
        this.state.username,
        this.state.message
      );
      this.setState({ message: "" });
    };
  }

  componentDidMount() {
    //axios.get
    if (this.props.location.state) {
      console.log("hit this");
      const joinCouch = { ...this.props.location.state };
      this.setState({ ...joinCouch });
    } else {
      console.log("hit THIS", this.props.location);
      const url = window.location.href;
      const splitURL = url.split("/");
      const couchId = splitURL[3];
      this.setState({ couchId: couchId });
    }
  }

  render() {
    console.log("this.state__________", this.state);
    return (
      <div>
        <h3>Share this Couch ID: {this.state.couchId}</h3>
        <ul id="messages">
          {this.state.messages.map(message => {
            return (
              <li>
                {/* {message.username}: {message.message} */}
                {message}
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
