import React, { useState } from 'react';

const ComplianceDeadlines = () => {
  const [deadlines, setDeadlines] = useState([
    {
      id: 1,
      title: 'Annual Financial Audit',
      description: 'Complete annual financial audit and submit to regulatory body',
      dueDate: '2023-12-31',
      category: 'Financial',
      status: 'Pending',
      priority: 'High',
    },
    {
      id: 2,
      title: 'GDPR Compliance Review',
      description: 'Review and update GDPR compliance measures',
      dueDate: '2023-11-30',
      category: 'Privacy',
      status: 'In Progress',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Tax Filing - Q4',
      description: 'Submit quarterly tax filings to IRS',
      dueDate: '2023-12-15',
      category: 'Financial',
      status: 'Pending',
      priority: 'High',
    },
    {
      id: 4,
      title: 'Employee Handbook Update',
      description: 'Review and update employee handbook for 2023',
      dueDate: '2023-12-10',
      category: 'HR',
      status: 'Completed',
      priority: 'Low',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newDeadline, setNewDeadline] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'Financial',
    priority: 'Medium',
  });

  const handleAddDeadline = (e) => {
    e.preventDefault();
    const deadline = {
      id: deadlines.length + 1,
      ...newDeadline,
      status: 'Pending',
    };
    setDeadlines([deadline, ...deadlines]);
    setNewDeadline({
      title: '',
      description: '',
      dueDate: '',
      category: 'Financial',
      priority: 'Medium',
    });
    setShowAddForm(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Financial':
        return 'bg-purple-100 text-purple-800';
      case 'Privacy':
        return 'bg-blue-100 text-blue-800';
      case 'HR':
        return 'bg-green-100 text-green-800';
      case 'Regulatory':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate days until deadline
  const getDaysUntil = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Compliance Deadlines</h1>
          <p className="text-gray-600 mt-1">Track and manage your compliance deadlines</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
        >
          {showAddForm ? 'Cancel' : 'Add Deadline'}
        </button>
      </div>

      {/* Add Deadline Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Compliance Deadline</h2>
          <form onSubmit={handleAddDeadline} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newDeadline.title}
                onChange={(e) => setNewDeadline({...newDeadline, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="e.g., Annual Financial Audit"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={newDeadline.category}
                onChange={(e) => setNewDeadline({...newDeadline, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              >
                <option value="Financial">Financial</option>
                <option value="Privacy">Privacy</option>
                <option value="HR">HR</option>
                <option value="Regulatory">Regulatory</option>
              </select>
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={newDeadline.dueDate}
                onChange={(e) => setNewDeadline({...newDeadline, dueDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                required
              />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={newDeadline.priority}
                onChange={(e) => setNewDeadline({...newDeadline, priority: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={newDeadline.description}
                onChange={(e) => setNewDeadline({...newDeadline, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="Describe the compliance requirement..."
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                Add Deadline
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Deadlines</h2>
        <div className="space-y-4">
          {deadlines.map((deadline) => {
            const daysUntil = getDaysUntil(deadline.dueDate);
            return (
              <div key={deadline.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800">{deadline.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{deadline.description}</p>
                  </div>
                  <div className="flex items-center mt-3 md:mt-0">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(deadline.status)} mr-2`}>
                      {deadline.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(deadline.priority)} mr-2`}>
                      {deadline.priority}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(deadline.category)}`}>
                      {deadline.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center mt-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-600">{deadline.dueDate}</span>
                  </div>
                  <span className="hidden md:inline mx-2 text-gray-300">•</span>
                  <div className={`text-sm ${daysUntil < 0 ? 'text-red-600' : daysUntil < 7 ? 'text-orange-600' : 'text-gray-600'}`}>
                    {daysUntil < 0 
                      ? `${Math.abs(daysUntil)} days overdue` 
                      : daysUntil === 0 
                        ? 'Due today' 
                        : `${daysUntil} days remaining`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Compliance Suggestions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">AI Compliance Suggestions</h2>
          <button className="text-[#FF6A00] text-sm font-medium hover:underline">
            Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">SOX Compliance Checklist</h3>
                <p className="text-sm text-gray-600 mt-1">Based on your funding stage, you may need to prepare for SOX compliance</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">High Priority</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add to Deadlines
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">State Tax Registration</h3>
                <p className="text-sm text-gray-600 mt-1">You may need to register for state taxes in new operating regions</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">Medium Priority</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add to Deadlines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDeadlines;