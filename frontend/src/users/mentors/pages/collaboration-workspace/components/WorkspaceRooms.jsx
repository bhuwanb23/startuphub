import React, { useState } from 'react';

const WorkspaceRooms = () => {
  const [rooms] = useState([
    { 
      id: 1, 
      name: 'TechFlow Inc. - Market Expansion', 
      startup: 'TechFlow Inc.', 
      mentor: 'You', 
      status: 'In Progress', 
      progress: 75,
      lastActivity: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'GreenEnergy Solutions - Funding Round', 
      startup: 'GreenEnergy Solutions', 
      mentor: 'Sarah Johnson', 
      status: 'Review', 
      progress: 90,
      lastActivity: '1 day ago'
    },
    { 
      id: 3, 
      name: 'HealthTrack - Product Development', 
      startup: 'HealthTrack', 
      mentor: 'Michael Chen', 
      status: 'Planning', 
      progress: 30,
      lastActivity: '2 days ago'
    }
  ]);

  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete market analysis', assignedTo: 'TechFlow Team', dueDate: '2023-06-20', status: 'Completed' },
    { id: 2, title: 'Review investor pitch deck', assignedTo: 'You', dueDate: '2023-06-18', status: 'In Progress' },
    { id: 3, title: 'Schedule customer interviews', assignedTo: 'TechFlow Team', dueDate: '2023-06-22', status: 'Pending' }
  ]);

  const [meetingNotes, setMeetingNotes] = useState([
    { id: 1, date: '2023-06-15', title: 'Q2 Strategy Session', author: 'You' },
    { id: 2, date: '2023-06-10', title: 'Product Roadmap Review', author: 'Alex Morgan' }
  ]);

  const [resources, setResources] = useState([
    { id: 1, name: 'Market Research.pdf', type: 'pdf', size: '2.4 MB' },
    { id: 2, name: 'Financial Projections.xlsx', type: 'xls', size: '1.1 MB' },
    { id: 3, name: 'Competitive Analysis.docx', type: 'doc', size: '0.8 MB' }
  ]);

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title: 'New Task',
      assignedTo: 'Unassigned',
      dueDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setTasks([...tasks, newTask]);
  };

  const handleStatusChange = (taskId, status) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'docx': return '📝';
      case 'xls': return '📊';
      case 'xlsx': return '📊';
      default: return '📁';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Mentor–Startup Workspace Rooms</h2>
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Room
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <div className="bg-[#FFF9F0] rounded-xl p-4">
            <h3 className="font-medium text-gray-800 mb-3">Project Rooms</h3>
            <div className="space-y-3">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setActiveRoom(room)}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    activeRoom.id === room.id
                      ? 'border-[#FF6A00] bg-white'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-800 text-sm">{room.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      room.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      room.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {room.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{room.startup}</p>
                  <div className="flex items-center mt-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                      <div 
                        className="bg-[#FF6A00] h-1.5 rounded-full" 
                        style={{ width: `${room.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{room.progress}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Last activity: {room.lastActivity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="bg-[#FFF9F0] rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">{activeRoom.name}</h3>
              <span className="text-sm text-gray-600">Mentor: {activeRoom.mentor}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{activeRoom.startup}</p>
          </div>

          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-6">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tasks'
                    ? 'border-[#FF6A00] text-[#FF6A00]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Task Lists
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'timeline'
                    ? 'border-[#FF6A00] text-[#FF6A00]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Shared Timeline
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notes'
                    ? 'border-[#FF6A00] text-[#FF6A00]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Meeting Notes
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'resources'
                    ? 'border-[#FF6A00] text-[#FF6A00]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Resources
              </button>
            </nav>
          </div>

          {activeTab === 'tasks' && (
            <div className="bg-white border border-gray-200 rounded-xl">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h4 className="font-medium text-gray-800">Task List</h4>
                <button 
                  onClick={handleAddTask}
                  className="px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors text-sm"
                >
                  Add Task
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 flex items-center">
                    <div className="mr-3">
                      <input
                        type="checkbox"
                        checked={task.status === 'Completed'}
                        onChange={(e) => handleStatusChange(task.id, e.target.checked ? 'Completed' : 'Pending')}
                        className="h-5 w-5 text-[#FF6A00] rounded focus:ring-[#FF6A00]"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className={`font-medium ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                      </h5>
                      <div className="flex text-sm text-gray-600 mt-1">
                        <span>Assigned to: {task.assignedTo}</span>
                        <span className="mx-2">•</span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded p-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-medium text-gray-800 mb-4">Project Timeline</h4>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                {/* Timeline items */}
                <div className="space-y-6 pl-10">
                  <div className="relative">
                    <div className="absolute -left-10 w-8 h-8 bg-[#FF6A00] rounded-full flex items-center justify-center text-white">
                      1
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-gray-800">Project Kickoff</h5>
                        <span className="text-sm text-gray-500">June 1, 2023</span>
                      </div>
                      <p className="text-gray-600 mt-2">Initial meeting to define project scope and objectives</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-10 w-8 h-8 bg-[#FF6A00] rounded-full flex items-center justify-center text-white">
                      2
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-gray-800">Market Research Complete</h5>
                        <span className="text-sm text-gray-500">June 15, 2023</span>
                      </div>
                      <p className="text-gray-600 mt-2">Completed comprehensive market analysis and competitor research</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-10 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                      3
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between">
                        <h5 className="font-medium text-gray-800">Product Development</h5>
                        <span className="text-sm text-gray-500">June 30, 2023</span>
                      </div>
                      <p className="text-gray-600 mt-2">MVP development and initial testing phase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="bg-white border border-gray-200 rounded-xl">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h4 className="font-medium text-gray-800">Meeting Notes</h4>
                <button className="px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors text-sm">
                  Add Note
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {meetingNotes.map((note) => (
                  <div key={note.id} className="p-4">
                    <div className="flex justify-between">
                      <h5 className="font-medium text-gray-800">{note.title}</h5>
                      <span className="text-sm text-gray-500">{note.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Author: {note.author}</p>
                    <button className="mt-2 text-sm text-[#FF6A00] hover:text-[#FF8C42]">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="bg-white border border-gray-200 rounded-xl">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h4 className="font-medium text-gray-800">Resource Repository</h4>
                <label className="px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors text-sm cursor-pointer">
                  Upload
                  <input type="file" className="hidden" />
                </label>
              </div>
              <div className="divide-y divide-gray-200">
                {resources.map((resource) => (
                  <div key={resource.id} className="p-4 flex items-center">
                    <div className="text-2xl mr-3">{getTypeIcon(resource.type)}</div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800">{resource.name}</h5>
                      <p className="text-sm text-gray-600">{resource.size}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-sm text-[#FF6A00] hover:text-[#FF8C42]">View</button>
                      <button className="text-sm text-[#FF6A00] hover:text-[#FF8C42]">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceRooms;