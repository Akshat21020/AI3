import React from 'react';
import './ChatBox.css';

const ChatBox = ({ messages, isTyping }) => {
  return (
    <div className="chatbox">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
          <p>{msg.text}</p>
          <span className="timestamp">{msg.timestamp.toLocaleTimeString()}</span>
        </div>
      ))}
      {isTyping && (
        <div className="typing-indicator">
          <p>Bot is typing...</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;