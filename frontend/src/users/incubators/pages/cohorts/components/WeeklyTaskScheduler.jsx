import React, { useState } from 'react';

const WeeklyTaskScheduler = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Business Model Canvas",
      description: "Fill out all sections of the canvas for your startup",
      assignee: "TechNova",
      priority: "high",
      dueDate: "2025-06-15",
      status: "todo"
    },
    {
      id: 2,
      title: "Conduct Customer Interviews",
      description: "Interview at least 5 potential customers",
      assignee: "MobileGenius",
      priority: "medium",
      dueDate: "2025-06-18",
      status: "in-progress"
    },
    {
      id: 3,
      title: "Prepare MVP Demo",
      description: "Create slides and demo script for MVP presentation",
      assignee: "HealthTrack",
      priority: "high",
      dueDate: "2025-06-20",
      status: "review"
    },
    {
      id: 4,
      title: "Analyze Market Research",
      description: "Compile findings from market research survey",
      assignee: "EcomPro",
      priority: "low",
      dueDate: "2025-06-22",
      status: "done"
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
    dueDate: ''
  });

  const [filterStatus, setFilterStatus] = useState('all');

  // Filter tasks based on status
  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filterStatus);

  // Move task to a different status
  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Add a new task
  const handleAddTask = () => {
    if (newTask.title && newTask.assignee && newTask.dueDate) {
      const task = {
        id: Date.now(),
        ...newTask,
        status: 'todo'
      };
      setTasks([...tasks, task]);
      setNewTask({
        title: '',
        description: '',
        assignee: '',
        priority: 'medium',
        dueDate: ''
      });
    }
  };

  // Get tasks by status
  const getTasksByStatus = (status) => {
    return filteredTasks.filter(task => task.status === status);
  };

  // Priority badge styling
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Status badge styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Weekly Task Scheduler</h1>
            <p className="text-gray-600">Manage startup tasks with Kanban board</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Filter:</span>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              >
                <option value="all">All Tasks</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>
            
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors text-sm">
              Add Task
            </button>
          </div>
        </div>
        
        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* To Do Column */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-800">To Do</h2>
              <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                {getTasksByStatus('todo').length}
              </span>
            </div>
            <div className="space-y-3 min-h-96">
              {getTasksByStatus('todo').map(task => (
                <div 
                  key={task.id} 
                  draggable
                  className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{task.assignee}</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => moveTask(task.id, 'in-progress')}
                      className="flex-1 bg-[#FF6A00] text-white py-1 rounded text-xs hover:bg-[#e05500] transition-colors"
                    >
                      Start
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-xs">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* In Progress Column */}
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-800">In Progress</h2>
              <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                {getTasksByStatus('in-progress').length}
              </span>
            </div>
            <div className="space-y-3 min-h-96">
              {getTasksByStatus('in-progress').map(task => (
                <div 
                  key={task.id} 
                  draggable
                  className="bg-white border border-blue-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{task.assignee}</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => moveTask(task.id, 'review')}
                      className="flex-1 bg-blue-500 text-white py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                    >
                      Review
                    </button>
                    <button 
                      onClick={() => moveTask(task.id, 'todo')}
                      className="flex-1 bg-gray-200 text-gray-700 py-1 rounded text-xs hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Review Column */}
          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-800">Review</h2>
              <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
                {getTasksByStatus('review').length}
              </span>
            </div>
            <div className="space-y-3 min-h-96">
              {getTasksByStatus('review').map(task => (
                <div 
                  key={task.id} 
                  draggable
                  className="bg-white border border-yellow-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{task.assignee}</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => moveTask(task.id, 'done')}
                      className="flex-1 bg-green-500 text-white py-1 rounded text-xs hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => moveTask(task.id, 'in-progress')}
                      className="flex-1 bg-gray-200 text-gray-700 py-1 rounded text-xs hover:bg-gray-300 transition-colors"
                    >
                      Revise
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Done Column */}
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-800">Done</h2>
              <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
                {getTasksByStatus('done').length}
              </span>
            </div>
            <div className="space-y-3 min-h-96">
              {getTasksByStatus('done').map(task => (
                <div 
                  key={task.id} 
                  draggable
                  className="bg-white border border-green-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-move"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{task.assignee}</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => moveTask(task.id, 'todo')}
                      className="flex-1 bg-gray-200 text-gray-700 py-1 rounded text-xs hover:bg-gray-300 transition-colors"
                    >
                      Redo
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-xs">
                      Archive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Task Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
            <input
              type="text"
              value={newTask.assignee}
              onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              placeholder="Startup name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddTask}
              disabled={!newTask.title || !newTask.assignee || !newTask.dueDate}
              className={`w-full py-2 rounded-lg text-sm font-medium ${
                !newTask.title || !newTask.assignee || !newTask.dueDate
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#FF6A00] text-white hover:bg-[#e05500]'
              }`}
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            placeholder="Enter task description"
            rows="2"
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyTaskScheduler;