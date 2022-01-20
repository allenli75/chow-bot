import React, {useEffect, useState} from 'react';
import Message from '../components/Message.js';
import './Chat.css';
import 'animate.css';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import {
  Link
} from 'react-router-dom';

const Chat = () => {
    const [messagesTemp, setMessagesTemp] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');

    const chatBubbles = messages.map((message, i) => (
        <Message
            key={`message-bubble-${i}`} 
            message={message['content']}
            sender={message['user']}
            i={i}
            className={'message-bubble'}
        />
    ));

    useEffect(() => {
      fetch("/api/chat", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: chatInput,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.intent.displayName !== "recipe") {
          const message = {
            content: data.fulfillmentText,
            user: 'bot'
          };
          setMessages([...messages, message]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      setChatInput('');
    }, [messagesTemp]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const message = {
          content: chatInput,
          user: 'user'
        };

        setMessagesTemp([...messages, message]);
        setMessages([...messages, message]);
    };

    return(
        <>
        <div className="animate__animated animate__rubberBand">
          <Link to="/">
            <img
              src={require("../assets/logo.png")}
              height="80"
              alt="logo"
              className="logo"
            />
          </Link>
        </div>
        <div className="animate__animated animate__fadeIn">
          <div className="chat-window">
              <div>{chatBubbles}</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="user-input">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="chat-input"
                  type="text"
                  placeholder="Let's get cooking!"
                />
                <button className="chat-submit">
                    <ArrowUpwardRoundedIcon/>
                </button>
              </div>
          </form>
        </div>
        </>
        
    );
};

export default Chat;