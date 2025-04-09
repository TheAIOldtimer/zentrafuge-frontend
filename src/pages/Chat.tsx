import React, { useState } from 'react';
import { sendMessage } from '../services/api';
import { Message } from '../types';

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Mock user data for testing
  const mockUser = {
    uid: 'test-user-123',
    name: 'Test User',
    buddyName: 'ZenBuddy',
    buddyVibe: 'calm' as const
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');
    
    try {
      // Call our backend API
      const result = await sendMessage(
        input, 
        mockUser.uid, 
        mockUser.buddyName, 
        mockUser.buddyVibe,
        messages
      );
      
      const buddyMessage: Message = {
        sender: 'buddy',
        text: result.reply,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, buddyMessage]);
      
      // If we got growth information, we could update it here
      console.log('Growth update:', {
        points: result.growthPoints,
        level: result.growthLevel,
        levelUp: result.levelUp
      });
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to get response from AI buddy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <h2>Chat with {mockUser.buddyName}</h2>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>Send a message to start chatting with your AI buddy!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender === 'user' ? 'user-message' : 'buddy-message'}`}
            >
              <div className="message-content">
                <p>{msg.text}</p>
              </div>
              <div className="message-timestamp">
                {msg.timestamp.toLocaleTimeString ? 
                  msg.timestamp.toLocaleTimeString() : 
                  'Just now'}
              </div>
            </div>
          ))
        )}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chat;
