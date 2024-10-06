import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Function to send message and get response from the provided API
  const sendMessage = async (message) => {
    const newMessage = { text: message, sender: 'user', timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setIsTyping(true);

    try {
      // API request
      const response = await fetch('https://ai3-sindhu-41ia-server-git-master-kartik-shrikhandes-projects.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: message, // Sending the message as expected by the API
        }),
      });

      const data = await response.json();

      // Assuming data.response contains an array of matching users
      const botMessage = {
        text: formatUserResponse(data.users), // Format the response
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

  // Function to format the user response data into readable text
  const formatUserResponse = (users) => {
    if (!users || users.length === 0) {
      return 'No users found matching your criteria.';
    }

    return users.map(user => (
      `Name: ${user.firstName} ${user.lastName}\n` +
      `Age: ${user.age}\n` +
      `Gender: ${user.gender}\n` +
      `City: ${user.city}, ${user.country}\n` +
      `Height: ${user.height}\n` +
      `Profession: ${user.profession}\n\n`
    )).join('');
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
