import React, { useState } from 'react';

const ExperimentLogs = () => {
  const [experiments, setExperiments] = useState([
    { 
      id: 1, 
      title: 'Drug Compound Testing', 
      date: '2023-07-15',
      researcher: 'Dr. Sarah Johnson',
      status: 'Completed',
      progress: 100
    },
    { 
      id: 2, 
      title: 'Battery Efficiency Analysis', 
      date: '2023-07-10',
      researcher: 'Prof. Michael Chen',
      status: 'In Progress',
      progress: 75
    },
    { 
      id: 3, 
      title: 'Algorithm Performance Benchmark', 
      date: '2023-07-05',
      researcher: 'Dr. Emily Rodriguez',
      status: 'Pending Review',
      progress: 90
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    title: '',
    description: '',
    datasets: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({
      ...newEntry,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const experiment = {
      id: experiments.length + 1,
      ...newEntry,
      date: new Date().toISOString().split('T')[0],
      researcher: 'Current User',
      status: 'In Progress',
      progress: 0
    };
    setExperiments([...experiments, experiment]);
    setNewEntry({
      title: '',
      description: '',
      datasets: []
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Experiment Logs</h1>
        <p className="text-gray-600">Step-by-step experiment entry with dataset attachment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Entry Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Experiment Entry</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Experiment Title</label>
              <input
                type="text"
                name="title"
                value={newEntry.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={newEntry.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Attach Datasets</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex justify-center">
                  <button type="button" className="text-[#F4A300] hover:text-[#F26B1D] font-medium">
                    Upload Dataset Files
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">Supports CSV, Excel, JSON formats</p>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-[#F4A300] hover:bg-[#F26B1D] text-white py-2 rounded-lg transition-colors"
            >
              Add Experiment Entry
            </button>
          </form>
        </div>

        {/* Experiment List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Experiment Log Entries</h2>
          <div className="space-y-4">
            {experiments.map((experiment) => (
              <div key={experiment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{experiment.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(experiment.status)}`}>
                    {experiment.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{experiment.description}</p>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{experiment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#F4A300] h-2 rounded-full" 
                      style={{ width: `${experiment.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                  <span>{experiment.researcher}</span>
                  <span>{experiment.date}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
                    Attach More Data
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                    Generate Insights
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-Generated Insights */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Auto-Generated Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="font-medium text-gray-800 mb-2">Pattern Detection</div>
            <div className="text-sm text-gray-600">Identified 3 recurring patterns in recent experiments</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="font-medium text-gray-800 mb-2">Anomaly Alerts</div>
            <div className="text-sm text-gray-600">2 potential anomalies detected in Battery Efficiency Analysis</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="font-medium text-gray-800 mb-2">Recommendations</div>
            <div className="text-sm text-gray-600">Suggested 2 optimization approaches for Drug Compound Testing</div>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="text-[#F4A300] hover:text-[#F26B1D] font-medium">
            View Full Insights Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperimentLogs;