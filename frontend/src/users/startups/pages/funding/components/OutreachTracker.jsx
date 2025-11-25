import React, { useState } from 'react';

const OutreachTracker = () => {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [searchTerm, setSearchTerm] = useState('');
  const [newOutreach, setNewOutreach] = useState({
    investor: '',
    type: 'email',
    subject: '',
    status: 'draft',
    priority: 'medium',
  });
  
  // Mock data for outreach activities
  const outreachActivities = [
    {
      id: 1,
      investor: 'Venture Capital Partners',
      type: 'email',
      subject: 'Series A Investment Opportunity',
      status: 'sent',
      priority: 'high',
      date: '2024-06-15',
      response: 'Positive',
      followUp: 'Scheduled',
    },
    {
      id: 2,
      investor: 'Innovation Fund',
      type: 'meeting',
      subject: 'Investment Discussion',
      status: 'scheduled',
      priority: 'high',
      date: '2024-06-20',
      response: 'Pending',
      followUp: 'None',
    },
    {
      id: 3,
      investor: 'Angel Investor Network',
      type: 'email',
      subject: 'Follow-up on Seed Investment',
      status: 'sent',
      priority: 'medium',
      date: '2024-06-10',
      response: 'No Response',
      followUp: 'Planned',
    },
    {
      id: 4,
      investor: 'Growth Capital Partners',
      type: 'call',
      subject: 'Initial Introduction',
      status: 'completed',
      priority: 'low',
      date: '2024-06-05',
      response: 'Interested',
      followUp: 'Done',
    },
    {
      id: 5,
      investor: 'Tech Investors Group',
      type: 'email',
      subject: 'Funding Opportunity',
      status: 'draft',
      priority: 'medium',
      date: '2024-06-18',
      response: 'Pending',
      followUp: 'None',
    },
  ];

  // Mock data for outreach templates
  const templates = [
    {
      id: 1,
      name: 'Initial Introduction',
      type: 'email',
      usage: 'Cold Outreach',
    },
    {
      id: 2,
      name: 'Follow-up Email',
      type: 'email',
      usage: 'Nurture',
    },
    {
      id: 3,
      name: 'Meeting Request',
      type: 'email',
      usage: 'Scheduling',
    },
    {
      id: 4,
      name: 'LOI Follow-up',
      type: 'email',
      usage: 'Negotiation',
    },
  ];

  const filteredActivities = outreachActivities.filter(activity => 
    activity.investor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResponseType = (response) => {
    switch (response) {
      case 'Positive': return 'bg-green-100 text-green-800';
      case 'Interested': return 'bg-blue-100 text-blue-800';
      case 'No Response': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Outreach Tracker</h1>
        <p className="text-gray-600 mt-1">Track and manage your investor outreach activities</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Outreach Insight</h2>
            <p className="text-gray-700 mt-1">
              Your outreach to Venture Capital Partners received a positive response. 
              Schedule a follow-up meeting within 72 hours to maintain momentum. 
              Your response rate is 40%, above industry average of 25%.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'pipeline'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Outreach Pipeline
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search outreach activities..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Outreach Pipeline */}
        {activeTab === 'pipeline' && (
          <div className="mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Investor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Response
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Follow-up
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{activity.investor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                          {activity.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                          {activity.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(activity.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getResponseType(activity.response)}`}>
                          {activity.response}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.followUp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#FF6A00] hover:text-[#e05500] mr-3">
                          Edit
                        </button>
                        <button className="text-[#FF6A00] hover:text-[#e05500]">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={() => setActiveTab('new')}
                className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium"
              >
                Create New Outreach
              </button>
            </div>
          </div>
        )}

        {/* Templates */}
        {activeTab === 'templates' && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Outreach Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <h4 className="text-lg font-bold text-gray-800">{template.name}</h4>
                    <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                      {template.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Usage: {template.usage}</p>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                      Use Template
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Outreach Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">24</div>
                <div className="text-sm text-gray-600">Total Outreach</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">9</div>
                <div className="text-sm text-gray-600">Responses</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">38%</div>
                <div className="text-sm text-gray-600">Response Rate</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">5</div>
                <div className="text-sm text-gray-600">Meetings Scheduled</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-bold text-gray-800 mb-3">Response Distribution</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Positive Responses</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Neutral Responses</span>
                    <span>35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>No Response</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gray-500" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Outreach Form */}
        {activeTab === 'new' && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Create New Outreach</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Investor Name</label>
                  <input
                    type="text"
                    value={newOutreach.investor}
                    onChange={(e) => setNewOutreach({...newOutreach, investor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    placeholder="Enter investor name"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Outreach Type</label>
                  <select
                    value={newOutreach.type}
                    onChange={(e) => setNewOutreach({...newOutreach, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  >
                    <option value="email">Email</option>
                    <option value="call">Call</option>
                    <option value="meeting">Meeting</option>
                    <option value="linkedin">LinkedIn Message</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newOutreach.priority}
                    onChange={(e) => setNewOutreach({...newOutreach, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={newOutreach.subject}
                    onChange={(e) => setNewOutreach({...newOutreach, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    placeholder="Enter subject line"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
                    <option>Select a template</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>{template.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newOutreach.status}
                    onChange={(e) => setNewOutreach({...newOutreach, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                rows="6"
                placeholder="Compose your message..."
              ></textarea>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button className="px-6 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium">
                Send Outreach
              </button>
              <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Save Draft
              </button>
              <button 
                onClick={() => setActiveTab('pipeline')}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Outreach Pipeline Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Outreach Pipeline</h2>
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2">
              1
            </div>
            <div className="text-sm font-medium text-gray-800">Draft</div>
            <div className="text-xs text-gray-500">8</div>
          </div>
          <div className="flex-1 h-1 bg-gray-200"></div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-2">
              2
            </div>
            <div className="text-sm font-medium text-gray-800">Sent</div>
            <div className="text-xs text-gray-500">12</div>
          </div>
          <div className="flex-1 h-1 bg-gray-200"></div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center mx-auto mb-2">
              3
            </div>
            <div className="text-sm font-medium text-gray-800">Response</div>
            <div className="text-xs text-gray-500">9</div>
          </div>
          <div className="flex-1 h-1 bg-gray-200"></div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center mx-auto mb-2">
              4
            </div>
            <div className="text-sm font-medium text-gray-800">Meeting</div>
            <div className="text-xs text-gray-500">5</div>
          </div>
          <div className="flex-1 h-1 bg-gray-200"></div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF6A00] flex items-center justify-center mx-auto mb-2">
              5
            </div>
            <div className="text-sm font-medium text-gray-800">LOI</div>
            <div className="text-xs text-gray-500">2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachTracker;