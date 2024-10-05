import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Function to send message and get response from local API
  const sendMessage = async (message) => {
    const newMessage = { text: message, sender: 'user', timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setIsTyping(true);

    try {
      // Local API request
      const response = await fetch('https://ai3-sindhu-41ia-server-git-master-kartik-shrikhandes-projects.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message, // Sending the message as expected by the local API
        }),
      });

      const data = await response.json();

      const botMessage = {
        text: data.response, // Adjust this based on your local API response format
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching API response:', error);
      const errorMessage = {
        text: 'Error: Unable to get response from the API. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <h1>Find Your Match</h1>
      <div className="chat-app">
        <Sidebar />
        <ChatBox messages={messages} isTyping={isTyping} />
        <ChatInput sendMessage={sendMessage} />
      </div>
    </>
  );
}

export default App;
