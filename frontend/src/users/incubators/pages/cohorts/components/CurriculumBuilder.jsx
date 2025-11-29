import React, { useState } from 'react';

const CurriculumBuilder = () => {
  const [units, setUnits] = useState([
    {
      id: 1,
      title: "Business Fundamentals",
      description: "Core concepts of business modeling and strategy",
      lessons: [
        {
          id: 1,
          title: "Introduction to Business Models",
          description: "Understanding different business model types",
          duration: "60 min",
          tasks: [
            { id: 1, title: "Read Business Model Generation", completed: false },
            { id: 2, title: "Complete Canvas Exercise", completed: false }
          ]
        },
        {
          id: 2,
          title: "Market Analysis",
          description: "Techniques for analyzing market opportunities",
          duration: "90 min",
          tasks: [
            { id: 3, title: "Conduct SWOT Analysis", completed: false },
            { id: 4, title: "Identify Target Segments", completed: false }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Product Development",
      description: "Building and validating your product",
      lessons: [
        {
          id: 3,
          title: "Minimum Viable Product",
          description: "Creating your first product version",
          duration: "120 min",
          tasks: [
            { id: 5, title: "Define Core Features", completed: false },
            { id: 6, title: "Create Prototype", completed: false }
          ]
        }
      ]
    }
  ]);

  const [newUnit, setNewUnit] = useState({ title: '', description: '' });
  const [newLesson, setNewLesson] = useState({ 
    title: '', 
    description: '', 
    duration: '',
    unitId: 1
  });
  const [newTask, setNewTask] = useState({ 
    title: '', 
    lessonId: 1
  });

  // Add a new unit
  const handleAddUnit = () => {
    if (newUnit.title) {
      const unit = {
        id: Date.now(),
        title: newUnit.title,
        description: newUnit.description,
        lessons: []
      };
      setUnits([...units, unit]);
      setNewUnit({ title: '', description: '' });
    }
  };

  // Add a new lesson
  const handleAddLesson = () => {
    if (newLesson.title && newLesson.unitId) {
      const lesson = {
        id: Date.now(),
        title: newLesson.title,
        description: newLesson.description,
        duration: newLesson.duration,
        tasks: []
      };
      
      const updatedUnits = units.map(unit => {
        if (unit.id === newLesson.unitId) {
          return {
            ...unit,
            lessons: [...unit.lessons, lesson]
          };
        }
        return unit;
      });
      
      setUnits(updatedUnits);
      setNewLesson({ 
        title: '', 
        description: '', 
        duration: '',
        unitId: units[0]?.id || 1
      });
    }
  };

  // Add a new task
  const handleAddTask = () => {
    if (newTask.title && newTask.lessonId) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        completed: false
      };
      
      const updatedUnits = units.map(unit => {
        return {
          ...unit,
          lessons: unit.lessons.map(lesson => {
            if (lesson.id === newTask.lessonId) {
              return {
                ...lesson,
                tasks: [...lesson.tasks, task]
              };
            }
            return lesson;
          })
        };
      });
      
      setUnits(updatedUnits);
      setNewTask({ title: '', lessonId: newTask.lessonId });
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (unitId, lessonId, taskId) => {
    const updatedUnits = units.map(unit => {
      if (unit.id === unitId) {
        return {
          ...unit,
          lessons: unit.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                tasks: lesson.tasks.map(task => {
                  if (task.id === taskId) {
                    return { ...task, completed: !task.completed };
                  }
                  return task;
                })
              };
            }
            return lesson;
          })
        };
      }
      return unit;
    });
    
    setUnits(updatedUnits);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Curriculum Builder</h1>
            <p className="text-gray-600">Create and organize curriculum units, lessons, and tasks</p>
          </div>
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors mt-4 md:mt-0">
            Save Curriculum
          </button>
        </div>
        
        {/* Units List */}
        <div className="space-y-6">
          {units.map((unit) => (
            <div key={unit.id} className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-[#FFF9F0] p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{unit.title}</h2>
                    <p className="text-gray-600">{unit.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                      Edit Unit
                    </button>
                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Lessons in Unit */}
              <div className="p-4">
                {unit.lessons.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {unit.lessons.map((lesson) => (
                      <div key={lesson.id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-gray-800">{lesson.title}</h3>
                            <p className="text-gray-600 text-sm">{lesson.description}</p>
                            <p className="text-gray-500 text-xs mt-1">{lesson.duration}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-[#FF6A00] hover:text-[#e05500] text-xs font-medium">
                              Edit
                            </button>
                            <button className="text-red-500 hover:text-red-700 text-xs font-medium">
                              Delete
                            </button>
                          </div>
                        </div>
                        
                        {/* Tasks */}
                        <div className="ml-2 pl-4 border-l-2 border-[#FF6A00]">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-700 text-sm">Tasks</h4>
                            <button 
                              onClick={() => setNewTask({ ...newTask, lessonId: lesson.id })}
                              className="text-[#FF6A00] hover:text-[#e05500] text-xs font-medium"
                            >
                              Add Task
                            </button>
                          </div>
                          
                          {lesson.tasks.length > 0 ? (
                            <ul className="space-y-2">
                              {lesson.tasks.map((task) => (
                                <li key={task.id} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(unit.id, lesson.id, task.id)}
                                    className="h-4 w-4 text-[#FF6A00] rounded focus:ring-[#FF6A00]"
                                  />
                                  <span className={`ml-2 text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                    {task.title}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 text-sm italic">No tasks added yet</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No lessons in this unit yet</p>
                  </div>
                )}
                
                {/* Add Lesson Button */}
                <button 
                  onClick={() => setNewLesson({ ...newLesson, unitId: unit.id })}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors"
                >
                  + Add Lesson to {unit.title}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add Unit Button */}
        <div className="mt-6">
          <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#FF6A00] hover:text-[#FF6A00] transition-colors">
            + Add New Unit
          </button>
        </div>
      </div>
      
      {/* Add Unit Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Unit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Title</label>
            <input
              type="text"
              value={newUnit.title}
              onChange={(e) => setNewUnit({...newUnit, title: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              placeholder="Enter unit title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={newUnit.description}
              onChange={(e) => setNewUnit({...newUnit, description: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              placeholder="Enter unit description"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddUnit}
            disabled={!newUnit.title}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              !newUnit.title
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#FF6A00] text-white hover:bg-[#e05500]'
            }`}
          >
            Add Unit
          </button>
        </div>
      </div>
      
      {/* Add Lesson Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Lesson</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
            <input
              type="text"
              value={newLesson.title}
              onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              placeholder="Enter lesson title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={newLesson.description}
              onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              placeholder="Enter lesson description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              value={newLesson.duration}
              onChange={(e) => setNewLesson({...newLesson, duration: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              placeholder="e.g., 60 min"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <select
              value={newLesson.unitId}
              onChange={(e) => setNewLesson({...newLesson, unitId: parseInt(e.target.value)})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {units.map(unit => (
                <option key={unit.id} value={unit.id}>{unit.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddLesson}
            disabled={!newLesson.title}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              !newLesson.title
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#FF6A00] text-white hover:bg-[#e05500]'
            }`}
          >
            Add Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurriculumBuilder;