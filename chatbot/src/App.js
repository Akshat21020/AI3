import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  

  // Function to send message and get response from OpenAI API
  const sendMessage = async (message) => {
    const newMessage = { text: message, sender: 'user', timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setIsTyping(true);

    try {
      // OpenAI API request
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your API key
        },
        body: JSON.stringify({
          model: 'text-davinci-003', // Use appropriate model
          prompt: message, // User's message
          max_tokens: 200, // Limit the response length
        }),
      });

      const data = await response.json();
      const botMessage = {
        text: data.choices[0].text.trim(), // Response from the API
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
  }

  return (

    <><h1>Find Your Match</h1><div className="chat-app">
      <Sidebar />
      <ChatBox messages={messages} isTyping={isTyping} />
      <ChatInput sendMessage={sendMessage} />
    </div></>
  );
}

export default App;