import React from "react";
import socketIOClient from "socket.io-client";

export default class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      message: "",
      messages: []
    };
    this.socket = socketIOClient("http://localhost:3000");
    this.socket.on("receive message", function(msg) {
      addMessage(msg);
    });

    const addMessage = msg => {
      console.log("data_________", msg);
      this.setState({ messages: [...this.state.messages, msg] });
      console.log("state_________", this.state);
    };

    this.sendMessage = event => {
      event.preventDefault();
      this.socket.emit("chat message", {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({ message: "" });
    };
  }

  render() {
    console.log("I am here", this.state);
    return (
      <div>
        <ul id="messages">
          {this.state.messages.map(message => {
            return (
              <li>
                {message.author}: {message.message}
              </li>
            );
          })}
        </ul>
        <form action="">
          <input
            type="text"
            placeholder="Message"
            value={this.state.message}
            onChange={ev => this.setState({ message: ev.target.value })}
            className="form-control"
          />
          <button onClick={this.sendMessage}>Send</button>
        </form>
        {/* {function() {
          var socket = io();
          $('form').submit(function(e) {
            e.preventDefault(); // prevents page reloading
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
          });
          socket.on('chat message', function(msg) {
            $('#messages').append($('<li>').text(msg));
            window.scrollTo(0, document.body.scrollHeight);
          });
        }} */}
      </div>
    );
  }
}
