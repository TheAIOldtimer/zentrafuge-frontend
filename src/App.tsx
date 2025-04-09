import React from 'react';
import './App.css';

function App() {
  const [message, setMessage] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // Import the sendMessage function from our API service
  const { sendMessage } = require('./services/api');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Call our backend API
      const result = await sendMessage(
        message, 
        'test-user-id', 
        'ZenBuddy', 
        'calm'
      );
      
      setResponse(result.reply);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to connect to the backend. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ZENTRAFUGE</h1>
        <h2>AI Mental Health Companion</h2>
      </header>
      
      <main className="App-main">
        <div className="chat-container">
          {response && (
            <div className="response-message">
              <p><strong>ZenBuddy:</strong> {response}</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message to your AI buddy..."
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
