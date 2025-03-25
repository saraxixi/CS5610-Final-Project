// src/components/Chatbot.js
import React, { useState } from 'react';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    // 用户消息
    const userMessage = { from: 'user', text: input };
    setMessages([...messages, userMessage]);

    // 模拟AI回复（你可以替换为API请求）
    setTimeout(() => {
      const botReply = { from: 'bot', text: "I'm an AI assistant. Let me get back to you!" };
      setMessages(prev => [...prev, botReply]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>
        💬
      </button>

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h4>AI Assistant</h4>
            <button onClick={toggleChat}>✖</button>
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
