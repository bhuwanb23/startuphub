import React, { useState } from 'react';

const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  
  // Mock message data
  const messages = [
    {
      id: 1,
      sender: 'Dr. Sarah Johnson',
      senderAvatar: 'SJ',
      subject: 'Quantum Computing Project Team',
      preview: 'We\'ve completed the initial testing phase and ready for peer review.',
      time: '2 hours ago',
      unread: true,
      tags: ['Research Partner'],
      participants: ['Dr. Sarah Johnson', 'Michael Jones', '+2 others']
    },
    {
      id: 2,
      sender: 'Funding Board',
      senderAvatar: 'FB',
      subject: 'Grant Application Feedback',
      preview: 'Your proposal has been approved with minor revisions requested.',
      time: '1 day ago',
      unread: false,
      tags: ['Grant Officer'],
      participants: ['Funding Board']
    },
    {
      id: 3,
      sender: 'BioTech Innovations',
      senderAvatar: 'BI',
      subject: 'Tech Transfer Collaboration',
      preview: 'We\'re interested in licensing your gene therapy research.',
      time: '2 days ago',
      unread: true,
      tags: ['Startup Collab'],
      participants: ['BioTech Innovations Legal']
    },
    {
      id: 4,
      sender: 'Dr. Elena Rodriguez',
      senderAvatar: 'ER',
      subject: 'Conference Presentation',
      preview: 'Would you like to present our joint research at the International Materials Conference?',
      time: '3 days ago',
      unread: false,
      tags: ['Research Partner'],
      participants: ['Dr. Elena Rodriguez']
    }
  ];

  // Mock full message data
  const fullMessages = {
    1: {
      id: 1,
      sender: 'Dr. Sarah Johnson',
      subject: 'Quantum Computing Project Team',
      content: `Hi there,

We've completed the initial testing phase of our quantum computing algorithm and are ready for peer review. The results show a 35% improvement in processing speed compared to classical computing methods for optimization problems.

I've attached the preliminary report and would appreciate your feedback before we submit to the journal.

Best regards,
Dr. Sarah Johnson`,
      time: '2 hours ago',
      attachments: [
        { name: 'Quantum_Algorithm_Report.pdf', type: 'pdf', size: '2.4 MB' },
        { name: 'Test_Results.xlsx', type: 'excel', size: '1.1 MB' }
      ]
    },
    2: {
      id: 2,
      sender: 'Funding Board',
      subject: 'Grant Application Feedback',
      content: `Dear Researcher,

We're pleased to inform you that your grant application has been approved. However, we request the following minor revisions before finalizing:

1. Clarify the budget allocation for equipment
2. Provide additional details on the timeline for deliverables
3. Include a risk mitigation plan

Please submit the revised proposal within 14 days.

Best regards,
Funding Board`,
      time: '1 day ago',
      attachments: []
    }
  };

  const currentMessage = selectedMessage ? fullMessages[selectedMessage] : fullMessages[1];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">✉️ Inbox</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Message List */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-900">Messages</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {messages.filter(m => m.unread).length} unread
              </span>
            </div>
            
            <div className="space-y-3">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    selectedMessage === message.id 
                      ? 'border-orange-500 bg-orange-50' 
                      : message.unread 
                        ? 'border-gray-300 bg-white' 
                        : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        {message.senderAvatar}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{message.sender}</h3>
                        <p className={`text-xs ${message.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                          {message.subject}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-2 truncate">{message.preview}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {message.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Center Panel - Chat/Messages */}
        <div className="lg:w-1/3 flex flex-col">
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100 flex-grow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-900">{currentMessage.subject}</h2>
              <span className="text-xs text-gray-500">{currentMessage.time}</span>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                  {currentMessage.sender.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{currentMessage.sender}</h3>
                  <p className="text-xs text-gray-500">To: Research Team</p>
                </div>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{currentMessage.content}</p>
              </div>
              
              {currentMessage.attachments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {currentMessage.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                            <p className="text-xs text-gray-500">{attachment.size}</p>
                          </div>
                        </div>
                        <button className="text-orange-600 hover:text-orange-800">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <textarea 
                className="w-full h-24 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                placeholder="Type your message here..."
              ></textarea>
              <div className="flex justify-between items-center mt-3">
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel - User Profile + Thread Info */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Participants</h2>
            <div className="space-y-3">
              {messages.find(m => m.id === selectedMessage || m.id === 1)?.participants.map((participant, index) => (
                <div key={index} className="flex items-center p-2 hover:bg-white rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 text-xs font-bold">
                    {participant.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{participant}</p>
                    <p className="text-xs text-gray-500">Researcher</p>
                  </div>
                  <button className="ml-auto text-orange-600 hover:text-orange-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100">
            <h2 className="font-semibold text-gray-900 mb-4">Thread Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Created</p>
                <p className="text-sm text-gray-900">Nov 25, 2025</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {messages.find(m => m.id === selectedMessage || m.id === 1)?.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">AI Summary</p>
                <p className="text-sm text-gray-700 mt-1">
                  Discussion about quantum computing research progress and peer review preparation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;