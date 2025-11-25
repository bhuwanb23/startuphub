import React, { useState } from 'react';

const ProjectWorkflows = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Product Launch Workflow',
      status: 'In Progress',
      progress: 65,
      startDate: '2023-10-01',
      endDate: '2023-12-15',
      owner: 'Alex Johnson',
    },
    {
      id: 2,
      name: 'Funding Application Process',
      status: 'Completed',
      progress: 100,
      startDate: '2023-09-01',
      endDate: '2023-10-30',
      owner: 'Sarah Williams',
    },
    {
      id: 3,
      name: 'Team Onboarding Process',
      status: 'Not Started',
      progress: 0,
      startDate: '2023-11-01',
      endDate: '2023-11-30',
      owner: 'Michael Chen',
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    startDate: '',
    endDate: '',
    owner: '',
  });

  const handleCreateWorkflow = (e) => {
    e.preventDefault();
    const workflow = {
      id: workflows.length + 1,
      ...newWorkflow,
      status: 'Not Started',
      progress: 0,
    };
    setWorkflows([...workflows, workflow]);
    setNewWorkflow({ name: '', startDate: '', endDate: '', owner: '' });
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
          <h1 className="text-2xl font-bold text-gray-800">Project Workflows</h1>
          <p className="text-gray-600 mt-1">Manage and automate your project workflows</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
        >
          {showCreateForm ? 'Cancel' : 'Create Workflow'}
        </button>
      </div>

      {/* Create Workflow Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Create New Workflow</h2>
          <form onSubmit={handleCreateWorkflow} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Workflow Name
              </label>
              <input
                type="text"
                id="name"
                value={newWorkflow.name}
                onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="e.g., Product Launch Workflow"
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
                value={newWorkflow.owner}
                onChange={(e) => setNewWorkflow({...newWorkflow, owner: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="e.g., Alex Johnson"
                required
              />
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={newWorkflow.startDate}
                onChange={(e) => setNewWorkflow({...newWorkflow, startDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={newWorkflow.endDate}
                onChange={(e) => setNewWorkflow({...newWorkflow, endDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                required
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                Create Workflow
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Workflow Timeline Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Workflow Timeline</h2>
        <div className="space-y-6">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="border-l-4 border-[#FF8C42] pl-4 py-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{workflow.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(workflow.status)}`}>
                      {workflow.status}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">Owner: {workflow.owner}</span>
                  </div>
                </div>
                <div className="mt-2 md:mt-0 text-sm text-gray-600">
                  {workflow.startDate} to {workflow.endDate}
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-800">{workflow.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                    style={{ width: `${workflow.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Suggested Workflows */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">AI-Suggested Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <h3 className="font-medium text-gray-800">IPR Filing Process</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">Automated workflow for patent and trademark applications</p>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              Use Template
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <h3 className="font-medium text-gray-800">Investor Reporting</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">Monthly reporting workflow for investors and stakeholders</p>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              Use Template
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <h3 className="font-medium text-gray-800">Compliance Checklist</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">Quarterly compliance workflow with automated reminders</p>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              Use Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkflows;