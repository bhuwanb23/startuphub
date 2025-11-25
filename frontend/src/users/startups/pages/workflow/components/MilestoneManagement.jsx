import React, { useState } from 'react';

const MilestoneManagement = () => {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: 'Product Launch',
      description: 'Official launch of our flagship product to the market',
      targetDate: '2023-12-15',
      status: 'In Progress',
      progress: 75,
      owner: 'Product Team',
      dependencies: ['Beta Testing', 'Marketing Campaign'],
    },
    {
      id: 2,
      title: 'Series A Funding',
      description: 'Secure Series A funding round',
      targetDate: '2024-02-28',
      status: 'Not Started',
      progress: 0,
      owner: 'Finance Team',
      dependencies: ['Financial Reports', 'Investor Deck'],
    },
    {
      id: 3,
      title: 'Team Expansion',
      description: 'Hire 10 new team members across departments',
      targetDate: '2023-11-30',
      status: 'Completed',
      progress: 100,
      owner: 'HR Team',
      dependencies: ['Job Postings', 'Interview Process'],
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    targetDate: '',
    owner: '',
    dependencies: '',
  });

  const handleCreateMilestone = (e) => {
    e.preventDefault();
    const milestone = {
      id: milestones.length + 1,
      ...newMilestone,
      status: 'Not Started',
      progress: 0,
      dependencies: newMilestone.dependencies.split(',').map(dep => dep.trim()).filter(dep => dep),
    };
    setMilestones([milestone, ...milestones]);
    setNewMilestone({
      title: '',
      description: '',
      targetDate: '',
      owner: '',
      dependencies: '',
    });
    setShowCreateForm(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Milestone Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your project milestones</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
        >
          {showCreateForm ? 'Cancel' : 'Create Milestone'}
        </button>
      </div>

      {/* Create Milestone Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Create New Milestone</h2>
          <form onSubmit={handleCreateMilestone} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Milestone Title
              </label>
              <input
                type="text"
                id="title"
                value={newMilestone.title}
                onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="e.g., Product Launch"
                required
              />
            </div>
            <div>
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
                Owner
              </label>
              <input
                type="text"
                id="owner"
                value={newMilestone.owner}
                onChange={(e) => setNewMilestone({...newMilestone, owner: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="e.g., Product Team"
                required
              />
            </div>
            <div>
              <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-1">
                Target Date
              </label>
              <input
                type="date"
                id="targetDate"
                value={newMilestone.targetDate}
                onChange={(e) => setNewMilestone({...newMilestone, targetDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                required
              />
            </div>
            <div>
              <label htmlFor="dependencies" className="block text-sm font-medium text-gray-700 mb-1">
                Dependencies (comma separated)
              </label>
              <input
                type="text"
                id="dependencies"
                value={newMilestone.dependencies}
                onChange={(e) => setNewMilestone({...newMilestone, dependencies: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="e.g., Beta Testing, Marketing Campaign"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={newMilestone.description}
                onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="Describe the milestone..."
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                Create Milestone
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gantt-Style Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Milestone Timeline</h2>
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="border-l-4 border-[#FF8C42] pl-4 py-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(milestone.status)} mr-2`}>
                      {milestone.status}
                    </span>
                    <span className="text-xs text-gray-500">Owner: {milestone.owner}</span>
                  </div>
                </div>
                <div className="mt-3 md:mt-0">
                  <div className="text-sm text-gray-600">Target: {milestone.targetDate}</div>
                  <div className="flex items-center mt-1">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{milestone.progress}%</span>
                  </div>
                </div>
              </div>
              {milestone.dependencies.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs text-gray-500 mb-1">Dependencies:</div>
                  <div className="flex flex-wrap gap-2">
                    {milestone.dependencies.map((dep, index) => (
                      <span key={index} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Milestone Suggestions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">AI Milestone Suggestions</h2>
          <button className="text-[#FF6A00] text-sm font-medium hover:underline">
            Refresh Suggestions
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">International Expansion</h3>
                <p className="text-sm text-gray-600 mt-1">Based on your growth metrics, consider expanding to EU markets</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Q2 2024</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add Milestone
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Mobile App Launch</h3>
                <p className="text-sm text-gray-600 mt-1">Suggested based on mobile traffic analytics and user feedback</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Q1 2024</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add Milestone
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Strategic Partnership</h3>
                <p className="text-sm text-gray-600 mt-1">AI identified potential partnership opportunities in your sector</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Q3 2024</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add Milestone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneManagement;