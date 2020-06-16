// react-bot/src/App.js

import React, { Component } from 'react';
import Pusher from 'pusher-js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      conversation: [],
    };
  }

  componentDidMount() {
    const pusher = new Pusher('2ce112876c7564106cb3', {
      cluster: 'us3',
      encrypted: true,
    });

    const channel = pusher.subscribe('bot');
    channel.bind('bot-response', data => {
      const msg = {
        text: data.message,
        user: 'ai',
      };
      this.setState({
        conversation: [...this.state.conversation, msg],
      });
    });
  }

  handleChange = event => {
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.userMessage.trim()) return;

    const msg = {
      text: this.state.userMessage,
      user: 'human',
    };

    this.setState({
      conversation: [...this.state.conversation, msg],
    });

    fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: this.state.userMessage,
      }),
    });

    this.setState({ userMessage: '' });
  };

  render() {
    const ChatBubble = (text, i, className) => {
      return (
        <div key= {`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );

    return (
      <div>
        <div className="chat-window">
        <img src={require("./icons/chow.png")} alt="logo" height="97.5" width="88.5" className="logo"/>
          <div className="conversation-view">{chat}</div>
          <div className="message-box">
            <form onSubmit={this.handleSubmit}>
              <div className = "input-container">
              <input
                value={this.state.userMessage}
                onInput={this.handleChange}
                className="text-input"
                type="text"
                autoFocus
                placeholder="Let's get cooking!"
              />
              </div>
              <div className = "button-container">
                <button type = "submit">
                  <p id = "send"> Send </p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
