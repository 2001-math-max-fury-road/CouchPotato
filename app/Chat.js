import React from 'react';
import Socket from './Socket'

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // couchId: props.couchId,
      // username: props.username,
      message: '',
      messages: [],
    };


    Socket.on('user-connected', username => {
      const message = `${username} connected`;
      const msgObj = {message, username}
      this.setState({ messages: [...this.state.messages, msgObj] });
    });

    Socket.on('user-disconnected', username => {
      const msg = `${username} disconnected`;
      this.setState({ messages: [...this.state.messages, msg] });
    });

    const addMessage = msg => {
      this.setState({ messages: [...this.state.messages, msg] });
    };

    this.sendMessage = event => {
      event.preventDefault();
      Socket.emit('send-chat-message', this.state.message, this.props.username);
      this.setState({ message: '' });
    };
    Socket.on('receive-message', msgObj => {
      addMessage(msgObj);
    });
  }

  // componentDidMount() {
  //   //axios.get
  //   if (this.props.location.state) {
  //     console.log('hit this')
  //     const joinCouch = { ...this.props.location.state };
  //     this.setState({ ...joinCouch });
  //   } else {
  //     console.log('hit THIS', this.props.location)
  //     const url = window.location.href;
  //     const splitURL = url.split('/');
  //     const couchId = splitURL[3];
  //     this.setState({ couchId: couchId });
  //   }
  // }

  // componentDidMount(){
  //   this.setState({couchId: this.props.couchId,
  //     username: this.props.username})
  // }

  render() {
    console.log('props in chat render', this.props.couchId)
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
