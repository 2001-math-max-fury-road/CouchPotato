import React from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

export default class Root extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  }

  render() {
    return (
      <div>
        <ul id="messages"></ul>
        <form action="">
          <input id="m" autocomplete="off" />
          <button onClick={this.handleSubmit}>Send</button>
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
