import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getConversations, createConversation, sendMessage } from '../slices/aiAssistantSlice';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Alert from '../components/Alert';
import LoadingOverlay from '../components/LoadingOverlay';
import ListItem from '../components/ListItem';

const AIAssistant = () => {
  const dispatch = useDispatch();
  
  const { conversations, currentConversation, messages, loading, error } = useSelector(state => state.aiAssistant);
  const [newMessage, setNewMessage] = useState('');
  const [conversationTitle, setConversationTitle] = useState('');
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  const handleCreateConversation = (e) => {
    e.preventDefault();
    
    if (!conversationTitle.trim()) {
      setAlertMessage('Please enter a conversation title');
      setAlertType('error');
      return;
    }

    dispatch(createConversation({ title: conversationTitle }))
      .then(() => {
        setShowNewConversation(false);
        setConversationTitle('');
      })
      .catch(() => {
        setAlertMessage('Failed to create conversation');
        setAlertType('error');
      });
  };

  const handleSelectConversation = (conversationId) => {
    dispatch(getConversation(conversationId));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !currentConversation) {
      return;
    }

    dispatch(sendMessage({
      conversationId: currentConversation.id,
      content: newMessage
    }))
      .then(() => {
        setNewMessage('');
      })
      .catch(() => {
        setAlertMessage('Failed to send message');
        setAlertType('error');
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading && !conversations) {
    return <LoadingOverlay />;
  }

  return (
    <div>
      <Header title="AI Medical Assistant" />
      
      {alertMessage && (
        <Alert type={alertType} message={alertMessage} onClose={() => setAlertMessage('')} />
      )}
      
      <div style={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
        {/* Conversations Sidebar */}
        <div style={{ width: '30%', borderRight: '1px solid #eee', padding: '10px', overflowY: 'auto' }}>
          <Button 
            onClick={() => setShowNewConversation(true)} 
            type="primary"
            style={{ marginBottom: '15px', width: '100%' }}
          >
            New Conversation
          </Button>
          
          {showNewConversation && (
            <Card style={{ marginBottom: '15px' }}>
              <form onSubmit={handleCreateConversation}>
                <Input 
                  label="Conversation Title" 
                  value={conversationTitle} 
                  onChange={(e) => setConversationTitle(e.target.value)} 
                  required 
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <Button onClick={() => setShowNewConversation(false)} type="secondary" size="small">Cancel</Button>
                  <Button type="primary" size="small" submit>Create</Button>
                </div>
              </form>
            </Card>
          )}
          
          {conversations && conversations.length > 0 ? (
            conversations.map(conversation => (
              <div 
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                style={{ 
                  padding: '10px', 
                  marginBottom: '5px', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: currentConversation && currentConversation.id === conversation.id ? '#f0f0f0' : 'transparent'
                }}
              >
                <h3 style={{ margin: '0 0 5px 0' }}>{conversation.title}</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                  {formatDate(conversation.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <p>No conversations yet. Start a new one!</p>
          )}
        </div>
        
        {/* Chat Area */}
        <div style={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
          {currentConversation ? (
            <>
              <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                <h2 style={{ margin: 0 }}>{currentConversation.title}</h2>
              </div>
              
              <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
                {messages && messages.length > 0 ? (
                  messages.map(message => (
                    <div 
                      key={message.id}
                      style={{ 
                        padding: '10px', 
                        borderRadius: '8px',
                        maxWidth: '80%',
                        marginBottom: '10px',
                        backgroundColor: message.isFromUser ? '#e1f5fe' : '#f5f5f5',
                        marginLeft: message.isFromUser ? 'auto' : '0',
                        marginRight: message.isFromUser ? '0' : 'auto'
                      }}
                    >
                      <p style={{ margin: 0 }}>{message.content}</p>
                      <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666', textAlign: 'right' }}>
                        {formatDate(message.createdAt)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', color: '#666' }}>
                    No messages yet. Start the conversation!
                  </p>
                )}
              </div>
              
              <div style={{ padding: '10px', borderTop: '1px solid #eee' }}>
                <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
                  <Input 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder="Type your message..." 
                    style={{ flex: 1, marginRight: '10px' }}
                  />
                  <Button type="primary" submit disabled={!newMessage.trim()}>Send</Button>
                </form>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <p>Select a conversation or start a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add missing function
const getConversation = (id) => {
  return {
    type: 'aiAssistant/getConversation',
    payload: id
  };
};

export default AIAssistant;
