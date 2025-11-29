import React, { useState } from 'react';

const WorkflowAutomation = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: "Startup Onboarding",
      description: "Automated onboarding process for new startups",
      status: "active",
      triggers: ["New startup application approved"],
      actions: [
        "Send welcome email",
        "Create startup profile",
        "Assign mentor",
        "Schedule orientation session"
      ],
      lastRun: "2025-06-15",
      runs: 24
    },
    {
      id: 2,
      name: "Milestone Check-in",
      description: "Weekly check-in workflow for all startups",
      status: "active",
      triggers: ["Weekly milestone due"],
      actions: [
        "Send reminder email",
        "Create task in scheduler",
        "Notify mentor"
      ],
      lastRun: "2025-06-16",
      runs: 126
    },
    {
      id: 3,
      name: "Funding Application",
      description: "Automated process for funding applications",
      status: "inactive",
      triggers: ["Startup requests funding"],
      actions: [
        "Send application form",
        "Create review task",
        "Notify investment committee"
      ],
      lastRun: "2025-06-10",
      runs: 8
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    triggers: [''],
    actions: ['']
  });

  // Add a new trigger
  const addTrigger = () => {
    setNewWorkflow({
      ...newWorkflow,
      triggers: [...newWorkflow.triggers, '']
    });
  };

  // Update trigger
  const updateTrigger = (index, value) => {
    const updatedTriggers = [...newWorkflow.triggers];
    updatedTriggers[index] = value;
    setNewWorkflow({
      ...newWorkflow,
      triggers: updatedTriggers
    });
  };

  // Remove trigger
  const removeTrigger = (index) => {
    const updatedTriggers = [...newWorkflow.triggers];
    updatedTriggers.splice(index, 1);
    setNewWorkflow({
      ...newWorkflow,
      triggers: updatedTriggers
    });
  };

  // Add a new action
  const addAction = () => {
    setNewWorkflow({
      ...newWorkflow,
      actions: [...newWorkflow.actions, '']
    });
  };

  // Update action
  const updateAction = (index, value) => {
    const updatedActions = [...newWorkflow.actions];
    updatedActions[index] = value;
    setNewWorkflow({
      ...newWorkflow,
      actions: updatedActions
    });
  };

  // Remove action
  const removeAction = (index) => {
    const updatedActions = [...newWorkflow.actions];
    updatedActions.splice(index, 1);
    setNewWorkflow({
      ...newWorkflow,
      actions: updatedActions
    });
  };

  // Toggle workflow status
  const toggleWorkflowStatus = (workflowId) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id === workflowId) {
        return {
          ...workflow,
          status: workflow.status === 'active' ? 'inactive' : 'active'
        };
      }
      return workflow;
    }));
  };

  // Handle adding new workflow
  const handleAddWorkflow = () => {
    if (newWorkflow.name) {
      const workflow = {
        id: Date.now(),
        ...newWorkflow,
        status: 'inactive',
        lastRun: 'Never',
        runs: 0
      };
      setWorkflows([...workflows, workflow]);
      setNewWorkflow({
        name: '',
        description: '',
        triggers: [''],
        actions: ['']
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Workflow Automation</h1>
            <p className="text-gray-600">Automate repetitive tasks and processes</p>
          </div>
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors mt-4 md:mt-0">
            Create New Workflow
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workflows List */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Workflows</h2>
            <div className="space-y-3">
              {workflows.map(workflow => (
                <div 
                  key={workflow.id}
                  onClick={() => setSelectedWorkflow(workflow)}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                    selectedWorkflow.id === workflow.id
                      ? 'border-[#FF6A00] bg-[#FFF9F0]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{workflow.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      workflow.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {workflow.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{workflow.description}</p>
                  <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                    <span>{workflow.runs} runs</span>
                    <span>Last: {workflow.lastRun}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Workflow Details */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Workflow Details</h2>
              <button
                onClick={() => toggleWorkflowStatus(selectedWorkflow.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedWorkflow.status === 'active'
                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {selectedWorkflow.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Name</label>
                  <input
                    type="text"
                    value={selectedWorkflow.name}
                    onChange={(e) => setSelectedWorkflow({...selectedWorkflow, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedWorkflow.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedWorkflow.status}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={selectedWorkflow.description}
                    onChange={(e) => setSelectedWorkflow({...selectedWorkflow, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    rows="2"
                  />
                </div>
              </div>
              
              {/* Triggers */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Triggers</label>
                  <button 
                    onClick={() => setSelectedWorkflow({
                      ...selectedWorkflow,
                      triggers: [...selectedWorkflow.triggers, '']
                    })}
                    className="text-[#FF6A00] text-sm font-medium"
                  >
                    + Add Trigger
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedWorkflow.triggers.map((trigger, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={trigger}
                        onChange={(e) => {
                          const updatedTriggers = [...selectedWorkflow.triggers];
                          updatedTriggers[index] = e.target.value;
                          setSelectedWorkflow({...selectedWorkflow, triggers: updatedTriggers});
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                        placeholder="Trigger condition..."
                      />
                      <button 
                        onClick={() => {
                          const updatedTriggers = [...selectedWorkflow.triggers];
                          updatedTriggers.splice(index, 1);
                          setSelectedWorkflow({...selectedWorkflow, triggers: updatedTriggers});
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Actions</label>
                  <button 
                    onClick={() => setSelectedWorkflow({
                      ...selectedWorkflow,
                      actions: [...selectedWorkflow.actions, '']
                    })}
                    className="text-[#FF6A00] text-sm font-medium"
                  >
                    + Add Action
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedWorkflow.actions.map((action, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={action}
                        onChange={(e) => {
                          const updatedActions = [...selectedWorkflow.actions];
                          updatedActions[index] = e.target.value;
                          setSelectedWorkflow({...selectedWorkflow, actions: updatedActions});
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                        placeholder="Action to perform..."
                      />
                      <button 
                        onClick={() => {
                          const updatedActions = [...selectedWorkflow.actions];
                          updatedActions.splice(index, 1);
                          setSelectedWorkflow({...selectedWorkflow, actions: updatedActions});
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Total Runs</p>
                  <p className="font-medium">{selectedWorkflow.runs}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Last Run</p>
                  <p className="font-medium">{selectedWorkflow.lastRun}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                  <p className="font-medium">98.5%</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
                  Save Changes
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Test Workflow
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  View Logs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Create New Workflow Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Create New Workflow</h2>
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Name</label>
              <input
                type="text"
                value={newWorkflow.name}
                onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                placeholder="Enter workflow name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={newWorkflow.description}
                onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                placeholder="Enter description"
              />
            </div>
          </div>
          
          {/* Triggers */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Triggers</label>
              <button 
                onClick={addTrigger}
                className="text-[#FF6A00] text-sm font-medium"
              >
                + Add Trigger
              </button>
            </div>
            <div className="space-y-2">
              {newWorkflow.triggers.map((trigger, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={trigger}
                    onChange={(e) => updateTrigger(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    placeholder="Trigger condition..."
                  />
                  <button 
                    onClick={() => removeTrigger(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Actions</label>
              <button 
                onClick={addAction}
                className="text-[#FF6A00] text-sm font-medium"
              >
                + Add Action
              </button>
            </div>
            <div className="space-y-2">
              {newWorkflow.actions.map((action, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={action}
                    onChange={(e) => updateAction(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    placeholder="Action to perform..."
                  />
                  <button 
                    onClick={() => removeAction(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleAddWorkflow}
            disabled={!newWorkflow.name}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              !newWorkflow.name
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#FF6A00] text-white hover:bg-[#e05500]'
            }`}
          >
            Create Workflow
          </button>
        </div>
      </div>
      
      {/* Workflow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Workflows</h3>
          <p className="text-2xl font-bold text-[#FF6A00]">{workflows.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Active Workflows</h3>
          <p className="text-2xl font-bold text-[#FF6A00]">
            {workflows.filter(w => w.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Runs</h3>
          <p className="text-2xl font-bold text-[#FF6A00]">
            {workflows.reduce((sum, workflow) => sum + workflow.runs, 0)}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Avg. Success Rate</h3>
          <p className="text-2xl font-bold text-[#FF6A00]">98.5%</p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowAutomation;