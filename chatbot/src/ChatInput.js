import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ sendMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <input 
        type="text" 
        placeholder="Type your message..." 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        className="chat-input"
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default ChatInput;