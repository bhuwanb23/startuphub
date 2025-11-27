import React, { useState } from 'react';

const AutomatedAgendaGenerator = ({ startup, onAgendaUpdate }) => {
  const [agendaItems, setAgendaItems] = useState([
    { id: 1, text: 'Review business model canvas', priority: 'High', editable: false },
    { id: 2, text: 'Discuss market validation progress', priority: 'Medium', editable: false },
    { id: 3, text: 'Address technical architecture concerns', priority: 'High', editable: false },
    { id: 4, text: 'Plan next milestone deliverables', priority: 'Medium', editable: false }
  ]);

  const [newItem, setNewItem] = useState('');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      const newItemObj = {
        id: Date.now(),
        text: newItem,
        priority: 'Medium',
        editable: true
      };
      setAgendaItems([...agendaItems, newItemObj]);
      setNewItem('');
    }
  };

  const handleDeleteItem = (id) => {
    setAgendaItems(agendaItems.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id, newText) => {
    setAgendaItems(agendaItems.map(item => 
      item.id === id ? { ...item, text: newText } : item
    ));
  };

  const handlePriorityChange = (id, priority) => {
    setAgendaItems(agendaItems.map(item => 
      item.id === id ? { ...item, priority } : item
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Automated Agenda Generator</h2>
        <button 
          onClick={() => onAgendaUpdate(agendaItems)}
          className="px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium text-sm"
        >
          Save Agenda
        </button>
      </div>

      <div className="mb-4 p-3 bg-[#FFF9F0] rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">AI Suggestion:</span> Based on {startup} gap analysis, these agenda items are recommended to address key challenges.
        </p>
      </div>

      <div className="space-y-3 mb-4">
        {agendaItems.map((item) => (
          <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              {item.editable ? (
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleUpdateItem(item.id, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              ) : (
                <span className="text-gray-800">{item.text}</span>
              )}
            </div>
            <div className="ml-3">
              <select
                value={item.priority}
                onChange={(e) => handlePriorityChange(item.id, e.target.value)}
                className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            {item.editable && (
              <button 
                onClick={() => handleDeleteItem(item.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new agenda item..."
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-[#FF6A00] focus:border-[#FF6A00]"
          onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
        />
        <button 
          onClick={handleAddItem}
          className="px-4 py-2 bg-[#FF6A00] text-white rounded-r-md hover:bg-[#FF8C42] transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AutomatedAgendaGenerator;