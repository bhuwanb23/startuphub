import React, { useState } from 'react';

const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const messages = [
    {
      id: 1,
      sender: 'TechStart Inc.',
      senderType: 'Startup',
      subject: 'Funding Round Update',
      preview: 'We\'ve completed our Series A due diligence and are ready to proceed with term sheet negotiation...',
      time: '10:30 AM',
      unread: true,
      category: 'deal'
    },
    {
      id: 2,
      sender: 'Sarah Johnson',
      senderType: 'Advisor',
      subject: 'Market Analysis Report',
      preview: 'Attached is the comprehensive market analysis for the AI/ML sector in Southeast Asia...',
      time: 'Yesterday',
      unread: false,
      category: 'document'
    },
    {
      id: 3,
      sender: 'Investor Portal',
      senderType: 'System',
      subject: 'NDA Signed - GreenTech Solutions',
      preview: 'The NDA with GreenTech Solutions has been successfully executed and is now active...',
      time: 'Nov 24',
      unread: true,
      category: 'nda'
    },
    {
      id: 4,
      sender: 'MediCore Ltd.',
      senderType: 'Startup',
      subject: 'Board Meeting Minutes',
      preview: 'Please find attached the minutes from our last board meeting held on November 22nd...',
      time: 'Nov 23',
      unread: false,
      category: 'document'
    },
    {
      id: 5,
      sender: 'Michael Chen',
      senderType: 'Advisor',
      subject: 'Portfolio Review - Q4',
      preview: 'I\'ve completed my quarterly review of your portfolio companies and have identified...',
      time: 'Nov 22',
      unread: false,
      category: 'review'
    }
  ];
  
  const filters = [
    { id: 'all', name: 'All Messages' },
    { id: 'unread', name: 'Unread' },
    { id: 'deal', name: 'Deal Updates' },
    { id: 'document', name: 'Documents' },
    { id: 'nda', name: 'NDAs' }
  ];
  
  const getSenderColor = (senderType) => {
    switch (senderType) {
      case 'Startup': return 'bg-blue-100 text-blue-800';
      case 'Advisor': return 'bg-purple-100 text-purple-800';
      case 'System': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredMessages = activeFilter === 'all' 
    ? messages 
    : messages.filter(msg => msg.category === activeFilter || (activeFilter === 'unread' && msg.unread));
  
  const currentMessage = messages.find(msg => msg.id === selectedMessage);
  
  return (
    <div className="flex h-[calc(100vh-200px)] bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Message List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Inbox</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div 
              key={message.id}
              onClick={() => setSelectedMessage(message.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedMessage === message.id ? 'bg-[#FFF5EB]' : ''
              }`}
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  {message.unread && (
                    <div className="w-2 h-2 rounded-full bg-[#FF6A00] mr-2"></div>
                  )}
                  <span className="font-medium text-gray-800">{message.sender}</span>
                </div>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              
              <div className="flex items-center mt-1">
                <span className={`px-2 py-1 rounded text-xs ${getSenderColor(message.senderType)}`}>
                  {message.senderType}
                </span>
              </div>
              
              <div className="mt-2">
                <h3 className={`text-sm font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                  {message.subject}
                </h3>
                <p className="text-xs text-gray-500 mt-1 truncate">{message.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Message Preview */}
      <div className="flex-1 flex flex-col">
        {currentMessage ? (
          <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{currentMessage.subject}</h2>
                  <div className="flex items-center mt-2">
                    <span className="font-medium text-gray-800">{currentMessage.sender}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className={`px-2 py-1 rounded text-xs ${getSenderColor(currentMessage.senderType)}`}>
                      {currentMessage.senderType}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{currentMessage.time}</div>
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose max-w-none">
                <p className="text-gray-700">
                  Dear Investor,
                </p>
                <p className="text-gray-700 mt-4">
                  {currentMessage.preview}
                </p>
                <p className="text-gray-700 mt-4">
                  We're excited to share that we've completed all necessary due diligence for our Series A funding round. 
                  Our financials have been audited, legal documents are in order, and we're ready to proceed with term sheet 
                  negotiation with our lead investor.
                </p>
                <p className="text-gray-700 mt-4">
                  Attached to this message, you'll find:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-700">
                  <li>Updated financial statements</li>
                  <li>Cap table analysis</li>
                  <li>Product roadmap for next 18 months</li>
                  <li>Customer testimonials</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  We propose scheduling a meeting next week to discuss the terms and move forward with the investment process. 
                  Please let us know your availability for Tuesday or Wednesday.
                </p>
                <p className="text-gray-700 mt-4">
                  Best regards,<br />
                  The TechStart Team
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium text-gray-800 mb-3">Attachments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <div className="text-2xl mr-3">📊</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">Financial_Statements_Q3_2025.pdf</div>
                      <div className="text-xs text-gray-500">2.4 MB</div>
                    </div>
                    <button className="px-3 py-1 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded text-sm">
                      Download
                    </button>
                  </div>
                  <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <div className="text-2xl mr-3">📋</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">Cap_Table_Analysis.xlsx</div>
                      <div className="text-xs text-gray-500">1.1 MB</div>
                    </div>
                    <button className="px-3 py-1 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded text-sm">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all">
                  Reply
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                  Forward
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                  Archive
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-3">📭</div>
              <p>Select a message to view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;