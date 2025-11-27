import React, { useState } from 'react';

const MentorshipRoadmapBuilder = () => {
  const [roadmaps, setRoadmaps] = useState({
    '30-day': [
      { id: 1, objective: 'Business Model Validation', actionSteps: 'Conduct customer interviews', deliverables: 'Interview transcripts', responsibilities: 'Mentor: Guide questions, Startup: Schedule interviews' },
      { id: 2, objective: 'Market Research', actionSteps: 'Analyze competitors', deliverables: 'Competitor analysis report', responsibilities: 'Both: Research and compile findings' }
    ],
    '60-day': [
      { id: 1, objective: 'Product Development Plan', actionSteps: 'Define MVP features', deliverables: 'Product roadmap', responsibilities: 'Mentor: Technical guidance, Startup: Feature prioritization' },
      { id: 2, objective: 'Go-to-Market Strategy', actionSteps: 'Identify target segments', deliverables: 'Marketing plan', responsibilities: 'Mentor: Channel expertise, Startup: Market knowledge' }
    ],
    '90-day': [
      { id: 1, objective: 'Funding Preparation', actionSteps: 'Prepare pitch deck', deliverables: 'Investor pitch deck', responsibilities: 'Mentor: Pitch coaching, Startup: Content creation' },
      { id: 2, objective: 'Team Expansion', actionSteps: 'Define key roles', deliverables: 'Hiring plan', responsibilities: 'Mentor: HR guidance, Startup: Role definitions' }
    ]
  });

  const [activeRoadmap, setActiveRoadmap] = useState('30-day');
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [milestoneForm, setMilestoneForm] = useState({
    objective: '',
    actionSteps: '',
    deliverables: '',
    responsibilities: ''
  });

  const handleAddMilestone = () => {
    if (milestoneForm.objective.trim()) {
      const newMilestone = {
        id: Date.now(),
        ...milestoneForm
      };
      
      setRoadmaps({
        ...roadmaps,
        [activeRoadmap]: [...roadmaps[activeRoadmap], newMilestone]
      });
      
      setMilestoneForm({
        objective: '',
        actionSteps: '',
        deliverables: '',
        responsibilities: ''
      });
    }
  };

  const handleEditMilestone = (milestone) => {
    setEditingMilestone(milestone.id);
    setMilestoneForm({
      objective: milestone.objective,
      actionSteps: milestone.actionSteps,
      deliverables: milestone.deliverables,
      responsibilities: milestone.responsibilities
    });
  };

  const handleUpdateMilestone = () => {
    if (editingMilestone && milestoneForm.objective.trim()) {
      setRoadmaps({
        ...roadmaps,
        [activeRoadmap]: roadmaps[activeRoadmap].map(milestone => 
          milestone.id === editingMilestone 
            ? { ...milestone, ...milestoneForm } 
            : milestone
        )
      });
      
      setEditingMilestone(null);
      setMilestoneForm({
        objective: '',
        actionSteps: '',
        deliverables: '',
        responsibilities: ''
      });
    }
  };

  const handleDeleteMilestone = (id) => {
    setRoadmaps({
      ...roadmaps,
      [activeRoadmap]: roadmaps[activeRoadmap].filter(milestone => milestone.id !== id)
    });
  };

  const roadmapLabels = {
    '30-day': '30-Day Roadmap',
    '60-day': '60-Day Roadmap',
    '90-day': '90-Day Roadmap'
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Mentorship Roadmap Builder</h2>
      
      <div className="flex border-b border-gray-200 mb-4">
        {Object.keys(roadmaps).map((key) => (
          <button
            key={key}
            onClick={() => {
              setActiveRoadmap(key);
              setEditingMilestone(null);
              setMilestoneForm({
                objective: '',
                actionSteps: '',
                deliverables: '',
                responsibilities: ''
              });
            }}
            className={`px-4 py-2 font-medium text-sm ${
              activeRoadmap === key
                ? 'border-b-2 border-[#FF6A00] text-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {roadmapLabels[key]}
          </button>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        {roadmaps[activeRoadmap].map((milestone) => (
          <div key={milestone.id} className="p-4 border border-gray-200 rounded-lg">
            {editingMilestone === milestone.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={milestoneForm.objective}
                  onChange={(e) => setMilestoneForm({...milestoneForm, objective: e.target.value})}
                  placeholder="Objective"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <textarea
                  value={milestoneForm.actionSteps}
                  onChange={(e) => setMilestoneForm({...milestoneForm, actionSteps: e.target.value})}
                  placeholder="Action steps"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="2"
                />
                <input
                  type="text"
                  value={milestoneForm.deliverables}
                  onChange={(e) => setMilestoneForm({...milestoneForm, deliverables: e.target.value})}
                  placeholder="Startup deliverables"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={milestoneForm.responsibilities}
                  onChange={(e) => setMilestoneForm({...milestoneForm, responsibilities: e.target.value})}
                  placeholder="Mentor responsibilities"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdateMilestone}
                    className="px-3 py-1 bg-[#FF6A00] text-white rounded-md hover:bg-[#FF8C42] transition-colors text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingMilestone(null);
                      setMilestoneForm({
                        objective: '',
                        actionSteps: '',
                        deliverables: '',
                        responsibilities: ''
                      });
                    }}
                    className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">{milestone.objective}</h3>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditMilestone(milestone)}
                      className="text-[#FF6A00] hover:text-[#FF8C42] text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMilestone(milestone.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Action steps:</span> {milestone.actionSteps}</p>
                <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Deliverables:</span> {milestone.deliverables}</p>
                <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Responsibilities:</span> {milestone.responsibilities}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-800 mb-3">
          {editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            value={milestoneForm.objective}
            onChange={(e) => setMilestoneForm({...milestoneForm, objective: e.target.value})}
            placeholder="Objective"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            value={milestoneForm.actionSteps}
            onChange={(e) => setMilestoneForm({...milestoneForm, actionSteps: e.target.value})}
            placeholder="Action steps"
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="2"
          />
          <input
            type="text"
            value={milestoneForm.deliverables}
            onChange={(e) => setMilestoneForm({...milestoneForm, deliverables: e.target.value})}
            placeholder="Startup deliverables"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={milestoneForm.responsibilities}
            onChange={(e) => setMilestoneForm({...milestoneForm, responsibilities: e.target.value})}
            placeholder="Mentor responsibilities"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={editingMilestone ? handleUpdateMilestone : handleAddMilestone}
            className="px-4 py-2 bg-[#FF6A00] text-white rounded-md hover:bg-[#FF8C42] transition-colors"
          >
            {editingMilestone ? 'Update Milestone' : 'Add Milestone'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipRoadmapBuilder;