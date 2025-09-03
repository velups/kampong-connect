import React, { useState } from 'react';
import { Send, Search, MoreVertical } from 'lucide-react';

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageText, setMessageText] = useState('');
  
  // Mock data - in real app, this would come from API
  const conversations = [
    {
      id: '1',
      participantName: 'Sarah Lim',
      participantRole: 'volunteer',
      lastMessage: 'I can help you with the grocery shopping tomorrow!',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      requestTitle: 'Grocery Shopping Help'
    },
    {
      id: '2',
      participantName: 'David Chen',
      participantRole: 'volunteer',
      lastMessage: 'What time works best for you?',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      requestTitle: 'Coffee Chat Companion'
    },
    {
      id: '3',
      participantName: 'Mrs. Tan',
      participantRole: 'elder',
      lastMessage: 'Thank you for your help yesterday!',
      lastMessageTime: '2 days ago',
      unreadCount: 0,
      requestTitle: 'Doctor Appointment'
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: 'volunteer1',
      senderName: 'Sarah Lim',
      content: 'Hi! I saw your request for grocery shopping help. I\'m available tomorrow morning.',
      timestamp: '9:15 AM',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'elder1',
      senderName: 'You',
      content: 'That would be wonderful! What time works for you?',
      timestamp: '9:20 AM',
      isOwn: true
    },
    {
      id: '3',
      senderId: 'volunteer1',
      senderName: 'Sarah Lim',
      content: 'I can help you with the grocery shopping tomorrow! How about 10 AM?',
      timestamp: '10:30 AM',
      isOwn: false
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    // TODO: Send message logic
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  return (
    <div className="h-[calc(100vh-200px)] flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                selectedConversation === conversation.id ? 'bg-primary-50 border-primary-200' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900">{conversation.participantName}</h4>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{conversation.requestTitle}</p>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  conversation.participantRole === 'volunteer' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {conversation.participantRole}
                </span>
                <span className="text-xs text-gray-400">{conversation.lastMessageTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {conversations.find(c => c.id === selectedConversation)?.participantName}
                </h3>
                <p className="text-sm text-gray-600">
                  {conversations.find(c => c.id === selectedConversation)?.requestTitle}
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? 'text-primary-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="btn-primary px-4 py-2 flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
              <p className="text-gray-600">Choose a conversation from the list to start chatting.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;