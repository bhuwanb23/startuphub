import React, { useState } from 'react';

const PersonaBuilder = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [personas, setPersonas] = useState([
    {
      id: 1,
      name: 'Tech-Savvy Professional',
      avatar: '🧑‍💻',
      role: 'Software Engineer',
      age: '28-35',
      income: '$85K-$120K',
      goals: ['Efficiency', 'Innovation', 'Career Growth'],
      painPoints: ['Time Management', 'Tool Overload', 'Work-Life Balance'],
      behaviors: ['Early Adopter', 'Research-Driven', 'Value Quality'],
      preferredChannels: ['LinkedIn', 'Tech Blogs', 'Webinars'],
      score: 88,
    },
    {
      id: 2,
      name: 'Growth-Focused Entrepreneur',
      avatar: '🚀',
      role: 'Startup Founder',
      age: '30-45',
      income: '$60K-$150K',
      goals: ['Scalability', 'Market Share', 'Funding Success'],
      painPoints: ['Resource Constraints', 'Competition', 'Talent Acquisition'],
      behaviors: ['Risk-Taker', 'Networker', 'Decision Maker'],
      preferredChannels: ['Twitter', 'Industry Events', 'Podcasts'],
      score: 92,
    },
  ]);
  
  const [newPersona, setNewPersona] = useState({
    name: '',
    avatar: '👤',
    role: '',
    age: '',
    income: '',
    goals: [],
    painPoints: [],
    behaviors: [],
    preferredChannels: [],
  });
  
  const [newGoal, setNewGoal] = useState('');
  const [newPainPoint, setNewPainPoint] = useState('');
  const [newBehavior, setNewBehavior] = useState('');
  const [newChannel, setNewChannel] = useState('');

  const addGoal = () => {
    if (newGoal.trim()) {
      setNewPersona({
        ...newPersona,
        goals: [...newPersona.goals, newGoal.trim()]
      });
      setNewGoal('');
    }
  };

  const addPainPoint = () => {
    if (newPainPoint.trim()) {
      setNewPersona({
        ...newPersona,
        painPoints: [...newPersona.painPoints, newPainPoint.trim()]
      });
      setNewPainPoint('');
    }
  };

  const addBehavior = () => {
    if (newBehavior.trim()) {
      setNewPersona({
        ...newPersona,
        behaviors: [...newPersona.behaviors, newBehavior.trim()]
      });
      setNewBehavior('');
    }
  };

  const addChannel = () => {
    if (newChannel.trim()) {
      setNewPersona({
        ...newPersona,
        preferredChannels: [...newPersona.preferredChannels, newChannel.trim()]
      });
      setNewChannel('');
    }
  };

  const removeGoal = (index) => {
    const updatedGoals = [...newPersona.goals];
    updatedGoals.splice(index, 1);
    setNewPersona({ ...newPersona, goals: updatedGoals });
  };

  const removePainPoint = (index) => {
    const updatedPainPoints = [...newPersona.painPoints];
    updatedPainPoints.splice(index, 1);
    setNewPersona({ ...newPersona, painPoints: updatedPainPoints });
  };

  const removeBehavior = (index) => {
    const updatedBehaviors = [...newPersona.behaviors];
    updatedBehaviors.splice(index, 1);
    setNewPersona({ ...newPersona, behaviors: updatedBehaviors });
  };

  const removeChannel = (index) => {
    const updatedChannels = [...newPersona.preferredChannels];
    updatedChannels.splice(index, 1);
    setNewPersona({ ...newPersona, preferredChannels: updatedChannels });
  };

  const savePersona = () => {
    if (newPersona.name && newPersona.role) {
      const persona = {
        ...newPersona,
        id: personas.length + 1,
        score: Math.floor(Math.random() * 20) + 80, // Random score between 80-100
      };
      setPersonas([...personas, persona]);
      setNewPersona({
        name: '',
        avatar: '👤',
        role: '',
        age: '',
        income: '',
        goals: [],
        painPoints: [],
        behaviors: [],
        preferredChannels: [],
      });
      setActiveTab('list');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Persona Builder</h1>
        <p className="text-gray-600 mt-1">Create detailed customer personas to understand your target audience</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Persona Insight</h2>
            <p className="text-gray-700 mt-1">
              Your primary audience segments are Tech-Savvy Professionals and Growth-Focused Entrepreneurs. 
              Both value innovation and efficiency but differ in communication preferences and decision-making patterns.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'list'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Persona List
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'create'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Create New Persona
          </button>
        </div>

        {activeTab === 'list' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {personas.map((persona) => (
              <div key={persona.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">{persona.avatar}</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold text-gray-800">{persona.name}</h3>
                      <span className="text-xl font-bold text-[#FF6A00]">{persona.score}/100</span>
                    </div>
                    <p className="text-gray-600">{persona.role}</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Age: {persona.age}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Income: {persona.income}</span>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700">Goals</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {persona.goals.map((goal, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <h4 className="text-sm font-semibold text-gray-700">Pain Points</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {persona.painPoints.map((point, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase">Behaviors</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {persona.behaviors.map((behavior, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {behavior}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase">Channels</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {persona.preferredChannels.map((channel, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'create' && (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Basic Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Persona Name</label>
                    <input
                      type="text"
                      value={newPersona.name}
                      onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                      placeholder="e.g., Tech-Savvy Professional"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role/Title</label>
                    <input
                      type="text"
                      value={newPersona.role}
                      onChange={(e) => setNewPersona({ ...newPersona, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                      <input
                        type="text"
                        value={newPersona.age}
                        onChange={(e) => setNewPersona({ ...newPersona, age: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                        placeholder="e.g., 25-35"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Income Range</label>
                      <input
                        type="text"
                        value={newPersona.income}
                        onChange={(e) => setNewPersona({ ...newPersona, income: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                        placeholder="e.g., $50K-$80K"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                    <input
                      type="text"
                      value={newPersona.avatar}
                      onChange={(e) => setNewPersona({ ...newPersona, avatar: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                      placeholder="e.g., 🧑‍💻"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Attributes</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Goals</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                        placeholder="Add a goal"
                        onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                      />
                      <button
                        onClick={addGoal}
                        className="px-4 py-2 bg-[#FF6A00] text-white rounded-r-lg hover:bg-[#e05500] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newPersona.goals.map((goal, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm flex items-center">
                          {goal}
                          <button
                            onClick={() => removeGoal(index)}
                            className="ml-2 text-green-800 hover:text-green-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pain Points</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={newPainPoint}
                        onChange={(e) => setNewPainPoint(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                        placeholder="Add a pain point"
                        onKeyPress={(e) => e.key === 'Enter' && addPainPoint()}
                      />
                      <button
                        onClick={addPainPoint}
                        className="px-4 py-2 bg-[#FF6A00] text-white rounded-r-lg hover:bg-[#e05500] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newPersona.painPoints.map((point, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm flex items-center">
                          {point}
                          <button
                            onClick={() => removePainPoint(index)}
                            className="ml-2 text-red-800 hover:text-red-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Behaviors</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={newBehavior}
                        onChange={(e) => setNewBehavior(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                        placeholder="Add a behavior"
                        onKeyPress={(e) => e.key === 'Enter' && addBehavior()}
                      />
                      <button
                        onClick={addBehavior}
                        className="px-4 py-2 bg-[#FF6A00] text-white rounded-r-lg hover:bg-[#e05500] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newPersona.behaviors.map((behavior, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm flex items-center">
                          {behavior}
                          <button
                            onClick={() => removeBehavior(index)}
                            className="ml-2 text-blue-800 hover:text-blue-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Channels</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={newChannel}
                        onChange={(e) => setNewChannel(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                        placeholder="Add a channel"
                        onKeyPress={(e) => e.key === 'Enter' && addChannel()}
                      />
                      <button
                        onClick={addChannel}
                        className="px-4 py-2 bg-[#FF6A00] text-white rounded-r-lg hover:bg-[#e05500] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newPersona.preferredChannels.map((channel, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm flex items-center">
                          {channel}
                          <button
                            onClick={() => removeChannel(index)}
                            className="ml-2 text-purple-800 hover:text-purple-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={savePersona}
                className="px-6 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium"
              >
                Save Persona
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Persona Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Persona Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-bold text-gray-800">Primary Segments</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Tech Professionals (42%)</li>
              <li>• Entrepreneurs (28%)</li>
              <li>• Enterprise Buyers (20%)</li>
              <li>• SMB Owners (10%)</li>
            </ul>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-bold text-gray-800">Key Characteristics</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Value-driven decision makers</li>
              <li>• Research extensive before purchase</li>
              <li>• Prefer self-service options</li>
              <li>• Influenced by peer recommendations</li>
            </ul>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-bold text-gray-800">Communication Preferences</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Email newsletters (65%)</li>
              <li>• LinkedIn content (58%)</li>
              <li>• Industry events (45%)</li>
              <li>• Webinars (40%)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaBuilder;