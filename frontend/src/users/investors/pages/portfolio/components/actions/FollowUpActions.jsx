import React, { useState } from 'react';

const FollowUpActions = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Review NeuroSync AI Q2 Financials',
      description: 'Analyze the detailed financial report and prepare questions for the next board meeting',
      status: 'In Progress',
      priority: 'High',
      deadline: '2023-06-30',
      assignee: 'Sarah Johnson'
    },
    {
      id: 2,
      title: 'Schedule Due Diligence for FinStream Analytics',
      description: 'Coordinate with legal team to begin due diligence process for Series A investment',
      status: 'To Do',
      priority: 'Medium',
      deadline: '2023-07-15',
      assignee: 'Michael Chen'
    },
    {
      id: 3,
      title: 'Follow up on GreenTech Pro Partnership',
      description: 'Contact potential partners identified in the market analysis report',
      status: 'Completed',
      priority: 'Low',
      deadline: '2023-06-20',
      assignee: 'David Wilson'
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    deadline: '',
    assignee: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const addTask = () => {
    if (newTask.title && newTask.deadline) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          ...newTask,
          status: 'To Do'
        }
      ]);
      setNewTask({
        title: '',
        description: '',
        priority: 'Medium',
        deadline: '',
        assignee: ''
      });
      setShowAddForm(false);
    }
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return 'bg-gray-100 text-gray-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Follow-up Actions Tracker</h2>
        <p className="text-gray-600">Task board and reminders for portfolio management</p>
      </div>

      {/* Task Board */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800">Task Board</h3>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium"
          >
            {showAddForm ? 'Cancel' : 'Add Task'}
          </button>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3">Add New Task</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  placeholder="Task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <input
                  type="text"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  placeholder="Assign to"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  rows="2"
                  placeholder="Task description"
                ></textarea>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={addTask}
                className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium"
              >
                Add Task
              </button>
            </div>
          </div>
        )}

        {/* Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-4">To Do</h4>
            <div className="space-y-3">
              {tasks.filter(task => task.status === 'To Do').map(task => (
                <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between">
                    <h5 className="font-medium text-gray-800">{task.title}</h5>
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">Due: {task.deadline}</span>
                    <button 
                      onClick={() => updateTaskStatus(task.id, 'In Progress')}
                      className="text-xs text-[#FF6A00] hover:text-[#e05500]"
                    >
                      Start
                    </button>
                  </div>
                  {task.assignee && (
                    <div className="mt-2 text-xs text-gray-500">Assigned to: {task.assignee}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-4">In Progress</h4>
            <div className="space-y-3">
              {tasks.filter(task => task.status === 'In Progress').map(task => (
                <div key={task.id} className="bg-white border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between">
                    <h5 className="font-medium text-gray-800">{task.title}</h5>
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">Due: {task.deadline}</span>
                    <button 
                      onClick={() => updateTaskStatus(task.id, 'Completed')}
                      className="text-xs text-green-600 hover:text-green-800"
                    >
                      Complete
                    </button>
                  </div>
                  {task.assignee && (
                    <div className="mt-2 text-xs text-gray-500">Assigned to: {task.assignee}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Completed Column */}
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-4">Completed</h4>
            <div className="space-y-3">
              {tasks.filter(task => task.status === 'Completed').map(task => (
                <div key={task.id} className="bg-white border border-green-200 rounded-lg p-4">
                  <div className="flex justify-between">
                    <h5 className="font-medium text-gray-800">{task.title}</h5>
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">Completed</span>
                    <span className="text-xs text-gray-500">{task.deadline}</span>
                  </div>
                  {task.assignee && (
                    <div className="mt-2 text-xs text-gray-500">Assigned to: {task.assignee}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI-Suggested Next Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">AI-Suggested Next Steps</h3>
        <div className="space-y-3">
          <div className="flex items-start p-3 bg-[#FFF5EB] border border-[#FF8C42] rounded-lg">
            <span className="text-[#FF6A00] mr-3 mt-0.5">🤖</span>
            <div>
              <div className="font-medium text-gray-800">Review NeuroSync AI's market expansion plan</div>
              <div className="text-sm text-gray-600">Based on their Q2 performance, consider discussing APAC market entry strategy in your next meeting.</div>
            </div>
          </div>
          <div className="flex items-start p-3 bg-[#FFF5EB] border border-[#FF8C42] rounded-lg">
            <span className="text-[#FF6A00] mr-3 mt-0.5">🤖</span>
            <div>
              <div className="font-medium text-gray-800">Schedule follow-up with FinStream Analytics</div>
              <div className="text-sm text-gray-600">Their burn rate has increased 12% this quarter. Recommend discussing cost optimization strategies.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Meeting Notes Panel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Meeting Notes</h3>
        <div className="bg-gray-50 rounded-lg p-4 min-h-[120px]">
          <p className="text-gray-600 text-sm">
            Last board meeting with NeuroSync AI (June 15, 2023): Discussed Q2 financials and product roadmap. 
            Key decisions: Approved additional $500K for R&D and agreed to explore strategic partnerships in healthcare sector.
          </p>
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
            Add Meeting Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpActions;