import React, { useState } from 'react';

const AutoTodos = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Prepare Q3 Financial Report',
      description: 'Compile financial data and create summary report for Q3',
      priority: 'High',
      dueDate: '2023-10-31',
      assignedTo: 'Finance Team',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Update Investor Deck',
      description: 'Incorporate latest metrics and market data into pitch deck',
      priority: 'Medium',
      dueDate: '2023-11-15',
      assignedTo: 'Alex Johnson',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Schedule Board Meeting',
      description: 'Coordinate with board members for quarterly meeting',
      priority: 'Low',
      dueDate: '2023-11-10',
      assignedTo: 'Sarah Williams',
      status: 'Completed',
    },
    {
      id: 4,
      title: 'File Patent Application',
      description: 'Submit patent application for new AI algorithm',
      priority: 'High',
      dueDate: '2023-12-01',
      assignedTo: 'Legal Team',
      status: 'Pending',
    },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'pending') return todo.status === 'Pending';
    if (filter === 'in-progress') return todo.status === 'In Progress';
    if (filter === 'completed') return todo.status === 'Completed';
    return true;
  });

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

  const toggleTodoStatus = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        if (todo.status === 'Pending') {
          return { ...todo, status: 'In Progress' };
        } else if (todo.status === 'In Progress') {
          return { ...todo, status: 'Completed' };
        } else {
          return { ...todo, status: 'Pending' };
        }
      }
      return todo;
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Auto-Generated To-Dos</h1>
        <p className="text-gray-600 mt-1">AI-powered task suggestions and management</p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'all' 
              ? 'bg-[#FF8C42] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Tasks
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'pending' 
              ? 'bg-[#FF8C42] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('in-progress')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'in-progress' 
              ? 'bg-[#FF8C42] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'completed' 
              ? 'bg-[#FF8C42] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Completed
        </button>
      </div>

      {/* AI Task Suggestions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">AI-Suggested Tasks</h2>
          <button className="text-[#FF6A00] text-sm font-medium hover:underline">
            Refresh Suggestions
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full border border-gray-300 mr-3 mt-1"></div>
              <div>
                <h3 className="font-medium text-gray-800">Prepare Market Analysis Report</h3>
                <p className="text-sm text-gray-600 mt-1">Based on your recent product launch</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Medium</span>
                  <span className="text-xs text-gray-500 ml-2">Due: 2023-11-20</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add to To-Dos
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full border border-gray-300 mr-3 mt-1"></div>
              <div>
                <h3 className="font-medium text-gray-800">Follow Up with Investors</h3>
                <p className="text-sm text-gray-600 mt-1">Send updates on product development</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">High</span>
                  <span className="text-xs text-gray-500 ml-2">Due: 2023-11-05</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add to To-Dos
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full border border-gray-300 mr-3 mt-1"></div>
              <div>
                <h3 className="font-medium text-gray-800">Update Company Website</h3>
                <p className="text-sm text-gray-600 mt-1">Add new team members and achievements</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Low</span>
                  <span className="text-xs text-gray-500 ml-2">Due: 2023-11-30</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add to To-Dos
            </button>
          </div>
        </div>
      </div>

      {/* To-Do List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Your To-Do List</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTodos.map((todo) => (
            <div key={todo.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start">
                <button 
                  onClick={() => toggleTodoStatus(todo.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded-full border mr-3 mt-1 ${
                    todo.status === 'Completed' 
                      ? 'bg-[#FF6A00] border-[#FF6A00]' 
                      : 'border-gray-300'
                  }`}
                >
                  {todo.status === 'Completed' && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className={`font-medium ${todo.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {todo.title}
                    </h3>
                    <div className="flex items-center mt-2 md:mt-0">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(todo.priority)} mr-2`}>
                        {todo.priority}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(todo.status)}`}>
                        {todo.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{todo.description}</p>
                  <div className="flex flex-col md:flex-row md:items-center mt-3">
                    <span className="text-xs text-gray-500">Due: {todo.dueDate}</span>
                    <span className="hidden md:inline mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-500 mt-1 md:mt-0">Assigned to: {todo.assignedTo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoTodos;