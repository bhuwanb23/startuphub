import React, { useState } from 'react';

const SessionManagement = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: "Business Model Workshop",
      date: "2025-06-15",
      time: "10:00 - 12:00",
      mentor: "Sarah Johnson",
      startups: ["TechNova", "MobileGenius", "EcomPro"],
      agenda: [
        "Introduction to Business Models (30 min)",
        "Canvas Exercise (60 min)",
        "Group Discussion (30 min)"
      ],
      materials: ["Business Model Canvas.pdf", "Case Studies.docx"],
      feedbackForm: "Business_Model_Workshop_Feedback.pdf"
    },
    {
      id: 2,
      title: "Product Feedback Session",
      date: "2025-06-16",
      time: "14:00 - 15:30",
      mentor: "Michael Chen",
      startups: ["HealthTrack", "AutoPilot"],
      agenda: [
        "MVP Demo (45 min)",
        "Feedback Round (30 min)",
        "Next Steps Discussion (15 min)"
      ],
      materials: ["Feedback_Template.docx"],
      feedbackForm: "Product_Feedback_Form.pdf"
    }
  ]);

  const [selectedSession, setSelectedSession] = useState(sessions[0]);
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
    mentor: '',
    startups: [],
    agenda: [''],
    materials: [''],
    feedbackForm: ''
  });

  // Add a new agenda item
  const addAgendaItem = () => {
    setNewSession({
      ...newSession,
      agenda: [...newSession.agenda, '']
    });
  };

  // Update agenda item
  const updateAgendaItem = (index, value) => {
    const updatedAgenda = [...newSession.agenda];
    updatedAgenda[index] = value;
    setNewSession({
      ...newSession,
      agenda: updatedAgenda
    });
  };

  // Remove agenda item
  const removeAgendaItem = (index) => {
    const updatedAgenda = [...newSession.agenda];
    updatedAgenda.splice(index, 1);
    setNewSession({
      ...newSession,
      agenda: updatedAgenda
    });
  };

  // Add a new material
  const addMaterial = () => {
    setNewSession({
      ...newSession,
      materials: [...newSession.materials, '']
    });
  };

  // Update material
  const updateMaterial = (index, value) => {
    const updatedMaterials = [...newSession.materials];
    updatedMaterials[index] = value;
    setNewSession({
      ...newSession,
      materials: updatedMaterials
    });
  };

  // Remove material
  const removeMaterial = (index) => {
    const updatedMaterials = [...newSession.materials];
    updatedMaterials.splice(index, 1);
    setNewSession({
      ...newSession,
      materials: updatedMaterials
    });
  };

  // Handle adding a new session
  const handleAddSession = () => {
    if (newSession.title && newSession.date && newSession.time && newSession.mentor) {
      const session = {
        id: Date.now(),
        ...newSession
      };
      setSessions([...sessions, session]);
      setNewSession({
        title: '',
        date: '',
        time: '',
        mentor: '',
        startups: [],
        agenda: [''],
        materials: [''],
        feedbackForm: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Session Management</h1>
            <p className="text-gray-600">Manage session details, agenda, and materials</p>
          </div>
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors mt-4 md:mt-0">
            Create New Session
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions List */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Sessions</h2>
            <div className="space-y-3">
              {sessions.map(session => (
                <div 
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                    selectedSession.id === session.id
                      ? 'border-[#FF6A00] bg-[#FFF9F0]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-bold text-gray-800">{session.title}</h3>
                  <p className="text-sm text-gray-600">{session.date} | {session.time}</p>
                  <p className="text-sm text-gray-500 mt-1">Mentor: {session.mentor}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {session.startups.slice(0, 3).map((startup, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {startup}
                      </span>
                    ))}
                    {session.startups.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        +{session.startups.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Session Details */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Session Details</h2>
            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
                  <input
                    type="text"
                    value={selectedSession.title}
                    onChange={(e) => setSelectedSession({...selectedSession, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mentor</label>
                  <input
                    type="text"
                    value={selectedSession.mentor}
                    onChange={(e) => setSelectedSession({...selectedSession, mentor: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={selectedSession.date}
                    onChange={(e) => setSelectedSession({...selectedSession, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={selectedSession.time}
                    onChange={(e) => setSelectedSession({...selectedSession, time: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    placeholder="e.g., 10:00 - 12:00"
                  />
                </div>
              </div>
              
              {/* Startups */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Startups</label>
                <div className="flex flex-wrap gap-2">
                  {selectedSession.startups.map((startup, index) => (
                    <span key={index} className="bg-[#FF6A00] text-white text-xs px-2 py-1 rounded-full flex items-center">
                      {startup}
                      <button 
                        onClick={() => {
                          const updatedStartups = [...selectedSession.startups];
                          updatedStartups.splice(index, 1);
                          setSelectedSession({...selectedSession, startups: updatedStartups});
                        }}
                        className="ml-1 text-white hover:text-gray-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Add startup..."
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        setSelectedSession({
                          ...selectedSession,
                          startups: [...selectedSession.startups, e.target.value.trim()]
                        });
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
              
              {/* Agenda */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Agenda</label>
                  <button 
                    onClick={() => setSelectedSession({
                      ...selectedSession,
                      agenda: [...selectedSession.agenda, '']
                    })}
                    className="text-[#FF6A00] text-sm font-medium"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedSession.agenda.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updatedAgenda = [...selectedSession.agenda];
                          updatedAgenda[index] = e.target.value;
                          setSelectedSession({...selectedSession, agenda: updatedAgenda});
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                      />
                      <button 
                        onClick={() => {
                          const updatedAgenda = [...selectedSession.agenda];
                          updatedAgenda.splice(index, 1);
                          setSelectedSession({...selectedSession, agenda: updatedAgenda});
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Materials */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Materials</label>
                  <button 
                    onClick={() => setSelectedSession({
                      ...selectedSession,
                      materials: [...selectedSession.materials, '']
                    })}
                    className="text-[#FF6A00] text-sm font-medium"
                  >
                    + Add Material
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedSession.materials.map((material, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={material}
                        onChange={(e) => {
                          const updatedMaterials = [...selectedSession.materials];
                          updatedMaterials[index] = e.target.value;
                          setSelectedSession({...selectedSession, materials: updatedMaterials});
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                        placeholder="Material name or file path"
                      />
                      <button 
                        onClick={() => {
                          const updatedMaterials = [...selectedSession.materials];
                          updatedMaterials.splice(index, 1);
                          setSelectedSession({...selectedSession, materials: updatedMaterials});
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Feedback Form */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback Form</label>
                <input
                  type="text"
                  value={selectedSession.feedbackForm}
                  onChange={(e) => setSelectedSession({...selectedSession, feedbackForm: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  placeholder="Feedback form name or path"
                />
              </div>
              
              <div className="flex space-x-3">
                <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
                  Save Changes
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Materials
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Send Reminders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionManagement;