// frontend/src/components/Chatbot/Chatbot.jsx
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';
import aiAssistVideo from '../../assets/Ai-assist.mp4';
import ryyzLogo from '../../assets/RYYZstore.jpg';

const Chatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [feedback, setFeedback] = useState({});
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [userName, setUserName] = useState('');

  // Load user info and chat history
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserName(user.first_name || user.username || 'Guest');
    
    // Load chat history from localStorage
    const savedHistory = localStorage.getItem(`chatHistory_${user.id || 'guest'}`);
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
    }
  }, []);

  // Save chat history whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem(`chatHistory_${user.id || 'guest'}`, JSON.stringify(messages));
    }
  }, [messages]);

  const connectWebSocket = () => {
    try {
      // Connect to WebSocket server
      const ws = new WebSocket('ws://localhost:8000/ws/chatbot/');
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        // Don't send automatic greeting - wait for user to ask
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleServerMessage(data);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        addMessage({
          type: 'error',
          content: 'Connection error. Please try again.',
          sender: 'bot'
        });
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  // WebSocket connection
  useEffect(() => {
    if (isOpen && !wsRef.current) {
      connectWebSocket();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleServerMessage = (data) => {
    setIsTyping(false);

    if (data.type === 'greeting' || data.type === 'text') {
      addMessage({
        type: 'text',
        content: data.message,
        sender: 'bot'
      });
    } else if (data.type === 'products') {
      addMessage({
        type: 'text',
        content: data.message,
        sender: 'bot'
      });
      
      if (data.products && data.products.length > 0) {
        addMessage({
          type: 'products',
          content: data.products,
          sender: 'bot'
        });
      }
    } else if (data.type === 'error') {
      addMessage({
        type: 'error',
        content: data.message,
        sender: 'bot'
      });
    }
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, {
      ...message,
      timestamp: new Date().toISOString()
    }]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !isConnected) return;

    // Add user message to chat
    addMessage({
      type: 'text',
      content: inputMessage,
      sender: 'user'
    });

    // Send message to server
    wsRef.current.send(JSON.stringify({
      message: inputMessage
    }));

    setInputMessage('');
    setIsTyping(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChatHistory = () => {
    if (window.confirm('Are you sure you want to clear your chat history?')) {
      setMessages([]);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.removeItem(`chatHistory_${user.id || 'guest'}`);
      
      // Reconnect to get fresh greeting
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        wsRef.current.send(JSON.stringify({ 
          type: 'user_info',
          user_name: user.first_name || user.username || 'Guest'
        }));
      }
    }
  };

  const handleFeedback = (messageIndex, type) => {
    setFeedback(prev => ({
      ...prev,
      [messageIndex]: prev[messageIndex] === type ? null : type
    }));
  };

  const handleProductClick = (product) => {
    // Determine which page to navigate to based on category
    const category = product.category.toLowerCase();
    let targetPage = '/women';
    
    if (category.includes('men') && !category.includes('women')) {
      targetPage = '/men';
    } else if (category.includes('women')) {
      targetPage = '/women';
    }
    
    // Store product details to open modal (use name for matching)
    sessionStorage.setItem('openProductModal', JSON.stringify({
      name: product.name,
      category: product.category,
      price: product.price
    }));
    
    // Close chatbot and navigate
    setIsOpen(false);
    navigate(targetPage);
  };

  const formatPrice = (price) => {
    return `${price.toFixed(2)} LE`;
  };

  const renderMessage = (message, index) => {
    const isBot = message.sender === 'bot';

    if (message.type === 'products') {
      return (
        <div key={index} className="message bot-message">
          <div className="message-avatar">
            <Bot size={20} />
          </div>
          <div className="products-container">
            {message.content.map((product) => {
              // Import image dynamically from assets
              const getProductImage = (imagePath) => {
                if (!imagePath) return null;
                try {
                  const imageName = imagePath.split('/').pop();
                  return new URL(`../../assets/${imageName}`, import.meta.url).href;
                } catch (e) {
                  console.error('Error loading image:', e);
                  return null;
                }
              };

              const imageUrl = getProductImage(product.image);

              return (
                <div 
                  key={product.id} 
                  className="product-card"
                  onClick={() => handleProductClick(product)}
                  style={{ cursor: 'pointer' }}
                >
                  {imageUrl && (
                    <img 
                      src={imageUrl} 
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="product-details">
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-category">{product.category}</p>
                  <p className="product-price">{formatPrice(product.price)}</p>
                  <p className="product-stock">
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </p>
                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}
                </div>
              </div>
            );
            })}
          </div>
        </div>
      );
    }

    return (
      <div key={index} className={`message ${isBot ? 'bot-message' : 'user-message'}`}>
        <div className="message-avatar">
          {isBot ? <Bot size={20} /> : <User size={20} />}
        </div>
        <div className="message-content">
          <p style={{ whiteSpace: 'pre-line' }}>{message.content}</p>
          <span className="message-time">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {isBot && (
            <div className="message-feedback">
              <button
                className={`feedback-btn ${feedback[index] === 'like' ? 'active-like' : ''}`}
                onClick={() => handleFeedback(index, 'like')}
                title="Helpful"
              >
                <ThumbsUp size={14} />
              </button>
              <button
                className={`feedback-btn ${feedback[index] === 'dislike' ? 'active-dislike' : ''}`}
                onClick={() => handleFeedback(index, 'dislike')}
                title="Not helpful"
              >
                <ThumbsDown size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Chatbot Icon with Video */}
      <button className={`chatbot-icon ${isOpen ? 'hidden' : ''}`} onClick={toggleChat}>
        <video 
          className="chatbot-video" 
          src={aiAssistVideo}
          autoPlay 
          loop 
          muted 
          playsInline
        />
        <span className="chatbot-badge">AI</span>
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <div className="chatbot-avatar">
              <img src={ryyzLogo} alt="RYYZ" className="chatbot-logo" />
            </div>
            <div className="chatbot-title">
              <h3>RYYZ Assistant</h3>
              <p className="chatbot-status">
                {isConnected ? (
                  <>
                    <span className="status-indicator online"></span>
                    Online
                  </>
                ) : (
                  <>
                    <span className="status-indicator offline"></span>
                    Connecting...
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="header-actions">
            {messages.length > 0 && (
              <button 
                className="clear-history-btn" 
                onClick={clearChatHistory}
                title="Clear chat history"
              >
                🗑️
              </button>
            )}
            <button className="close-button" onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="chatbot-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <img src={ryyzLogo} alt="RYYZ" className="welcome-logo" />
              <h4>Welcome {userName}! 👋</h4>
              <p>I'm your RYYZ AI shopping assistant. I can help you find the perfect hoodies, jackets, and more. What are you looking for today?</p>
            </div>
          )}
          
          {messages.map((message, index) => renderMessage(message, index))}
          
          {isTyping && (
            <div className="message bot-message typing">
              <div className="message-avatar">
                <Bot size={20} />
              </div>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chatbot-input">
          <input
            type="text"
            placeholder={isConnected ? "Type your message..." : "Connecting..."}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isConnected}
            className="chat-input"
          />
          <button 
            className="send-button" 
            onClick={handleSendMessage}
            disabled={!isConnected || !inputMessage.trim()}
          >
            <Send size={20} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button 
            className="quick-action-btn"
            onClick={() => {
              const message = 'Show me hoodies';
              if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                addMessage({ type: 'text', content: message, sender: 'user' });
                wsRef.current.send(JSON.stringify({ message }));
                setIsTyping(true);
              }
            }}
            disabled={!isConnected}
          >
            Show Hoodies
          </button>
          <button 
            className="quick-action-btn"
            onClick={() => {
              const message = 'Show me jackets';
              if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                addMessage({ type: 'text', content: message, sender: 'user' });
                wsRef.current.send(JSON.stringify({ message }));
                setIsTyping(true);
              }
            }}
            disabled={!isConnected}
          >
            Show Jackets
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
