import React, { useState } from 'react';

const ProgramPlanner = () => {
  const [weeks, setWeeks] = useState([
    {
      id: 1,
      weekNumber: 1,
      title: "Program Kickoff",
      modules: [
        { id: 1, title: "Welcome & Introduction", duration: "2 hours", type: "workshop" },
        { id: 2, title: "Program Overview", duration: "1 hour", type: "session" }
      ]
    },
    {
      id: 2,
      weekNumber: 2,
      title: "Business Fundamentals",
      modules: [
        { id: 3, title: "Business Model Canvas", duration: "3 hours", type: "workshop" },
        { id: 4, title: "Market Research", duration: "2 hours", type: "session" }
      ]
    },
    {
      id: 3,
      weekNumber: 3,
      title: "Product Development",
      modules: [
        { id: 5, title: "MVP Design", duration: "4 hours", type: "workshop" },
        { id: 6, title: "User Testing", duration: "2 hours", type: "session" }
      ]
    }
  ]);

  const [newModule, setNewModule] = useState({
    title: '',
    duration: '',
    type: 'session'
  });

  const [selectedWeek, setSelectedWeek] = useState(1);

  // Handle adding a new module
  const handleAddModule = () => {
    if (newModule.title && newModule.duration) {
      const updatedWeeks = weeks.map(week => {
        if (week.id === selectedWeek) {
          return {
            ...week,
            modules: [
              ...week.modules,
              {
                id: Date.now(),
                title: newModule.title,
                duration: newModule.duration,
                type: newModule.type
              }
            ]
          };
        }
        return week;
      });
      
      setWeeks(updatedWeeks);
      setNewModule({ title: '', duration: '', type: 'session' });
    }
  };

  // Handle dragging modules (simplified for this example)
  const handleDragStart = (e, moduleId) => {
    e.dataTransfer.setData("moduleId", moduleId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetWeekId) => {
    e.preventDefault();
    // In a real implementation, this would move the module between weeks
    console.log(`Dropped module on week ${targetWeekId}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Program Planner</h1>
            <p className="text-gray-600">Drag and drop to schedule program modules</p>
          </div>
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors mt-4 md:mt-0">
            Save Program
          </button>
        </div>
        
        {/* Timeline View */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex min-w-max space-x-6 pb-4">
            {weeks.map((week) => (
              <div 
                key={week.id}
                className={`flex-shrink-0 w-64 border rounded-2xl p-4 ${
                  selectedWeek === week.id 
                    ? 'border-[#FF6A00] bg-[#FFF9F0]' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-800">Week {week.weekNumber}</h3>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {week.modules.length} modules
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{week.title}</p>
                <button 
                  onClick={() => setSelectedWeek(week.id)}
                  className="text-[#FF6A00] text-sm font-medium"
                >
                  {selectedWeek === week.id ? 'Selected' : 'Select'}
                </button>
              </div>
            ))}
            
            {/* Add Week Button */}
            <div className="flex-shrink-0 w-64 border-2 border-dashed border-gray-300 rounded-2xl p-4 flex items-center justify-center">
              <button className="text-gray-500 hover:text-[#FF6A00] flex flex-col items-center">
                <span className="text-2xl mb-1">+</span>
                <span>Add Week</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Modules for Selected Week */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Modules for Week {weeks.find(w => w.id === selectedWeek)?.weekNumber}: {weeks.find(w => w.id === selectedWeek)?.title}
            </h2>
            <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
              Add Module
            </button>
          </div>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, selectedWeek)}
          >
            {weeks.find(w => w.id === selectedWeek)?.modules.map((module) => (
              <div 
                key={module.id}
                draggable
                onDragStart={(e) => handleDragStart(e, module.id)}
                className="border border-gray-200 rounded-xl p-4 hover:border-[#FF6A00] transition-colors cursor-move"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{module.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    module.type === 'workshop' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {module.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{module.duration}</p>
                <div className="flex space-x-2">
                  <button className="text-xs text-[#FF6A00] hover:text-[#e05500]">
                    Edit
                  </button>
                  <button className="text-xs text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Add New Module Form */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Module</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Module Title</label>
              <input
                type="text"
                value={newModule.title}
                onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                placeholder="Enter module title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                value={newModule.duration}
                onChange={(e) => setNewModule({...newModule, duration: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                placeholder="e.g., 2 hours"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={newModule.type}
                onChange={(e) => setNewModule({...newModule, type: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              >
                <option value="session">Session</option>
                <option value="workshop">Workshop</option>
                <option value="assignment">Assignment</option>
                <option value="review">Review</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddModule}
                disabled={!newModule.title || !newModule.duration}
                className={`w-full py-2 rounded-lg text-sm font-medium ${
                  !newModule.title || !newModule.duration
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#FF6A00] text-white hover:bg-[#e05500]'
                }`}
              >
                Add Module
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Color-coded Milestones Legend */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Milestone Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm">Workshop</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm">Session</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span className="text-sm">Assignment</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
            <span className="text-sm">Review</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPlanner;