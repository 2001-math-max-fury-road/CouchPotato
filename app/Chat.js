import React from 'react';
import Socket from './Socket';
// import { animateScroll } from 'react-scroll';
import ScrollToBottom from 'react-scroll-to-bottom';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    };
    // this.scrollToBottom = this.scrollToBottom.bind(this);

    Socket.on('user-connected', username => {
      const message = `${username} joined the Couch`;
      this.setState({ messages: [...this.state.messages, message] });
    });

    Socket.on('user-disconnected', username => {
      const message = `${username} has left the Couch`;
      this.setState({ messages: [...this.state.messages, message] });
    });

    Socket.on('receive-message', msgObj => {
      this.setState({ messages: [...this.state.messages, msgObj] });
    });

    this.sendMessage = event => {
      event.preventDefault();
      Socket.emit(
        'send-chat-message',
        this.state.message,
        localStorage.username,
        localStorage.couchId
      );
      this.setState({ message: '' });
    };
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    const couchId = localStorage.getItem('couchId');
    Socket.emit('new-user', couchId, username);
    // this.scrollToBottom();
  }

  componentDidUpdate() {
    // this.scrollToBottom();
    // function scrollToBottom() {
    //   elemToScroll.scrollTop = scroll.scrollHeight;
    //   // this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    // }
    // const elemToScroll = document.querySelector('.chat');
    // const observer = new MutationObserver(scrollToBottom);
    // const config = { childList: true };
    // observer.observe(scroll, config);
  }

  // scrollToBottom() {
  //   animateScroll.scrollToBottom({
  //     containerId: 'chat-container'
  //   });
  // }

  componentWillUnmount() {
    Socket.emit('disconnect');
  }

  render() {
    return (
      <div id="outer-container">
        <div id="chat-container">
          <h3>Share this Couch ID: {localStorage.couchId}</h3>
          {/* <ScrollToBottom> */}
          <div>
            <ul id="messages">
              <ScrollToBottom className="scroll-to-bottom">
                {this.state.messages.map(message => {
                  if (message.username) {
                    return (
                      <li>
                        {message.username}: {message.message}
                      </li>
                    );
                  } else {
                    return <li>{message}</li>;
                  }
                })}
              </ScrollToBottom>
            </ul>
          </div>
          {/* <div
              id="end-chat"
              style={{ float: 'left', clear: 'both' }}
              ref={el => {
                this.messagesEnd = el;
              }}
            ></div> */}
          {/* </ScrollToBottom> */}
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
      </div>
    );
  }
}
