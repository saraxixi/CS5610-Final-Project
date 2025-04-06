import React, { useState, useEffect } from 'react';
import { BsChatLeftText } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to the Dunhuang Digital Museum! I can answer your questions about Dunhuang history, art, and culture in 10 languages including English, Chinese, and Spanish. What would you like to know about this website?' }
  ]);

  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async() => {
    if (!input.trim()) return;

    // user message
    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:4000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();

      const botReply = { from: 'bot', text: data.reply };
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error('Failed to send message:', err);
      setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, I failed to respond' }]);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>
        <BsChatLeftText style={{width: '100%', height: '100%'}} color="#fff"/>
      </button>

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h4>AI Assistant</h4>
            <button className="header-close"onClick={toggleChat}>
            <IoClose />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
