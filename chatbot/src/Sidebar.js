import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <button className="sidebar-btn active">New Chat</button>
      <div className="footer">
      <button className="sidebar-btn active">Light Mode</button>
      <button className="sidebar-btn active">Clear Conservations</button>
        <p>MHTECHIN</p>
        <p>Updates & FAQ</p>
        <p>Log out</p>
      </div>
    </div>
  );
};

export default Sidebar;