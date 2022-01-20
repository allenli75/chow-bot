import React from 'react';
import './Message.css';

const Message = ({message, sender, i}) => {
    return(
        <div className={`chat-bubble ${sender}`}>
            <div className={`chat-content ${sender}`}>
                {message}
            </div>
        </div>
        
    );
};

export default Message;