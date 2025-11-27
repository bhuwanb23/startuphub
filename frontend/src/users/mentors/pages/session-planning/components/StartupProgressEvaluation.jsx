import React, { useState } from 'react';

const StartupProgressEvaluation = () => {
  const [evaluation, setEvaluation] = useState({
    productProgress: '',
    strategyAdequacy: '',
    marketValidation: '',
    executionEfficiency: '',
    redFlags: ''
  });

  const [aiRedFlags] = useState([
    'Delayed product milestones by 2 weeks',
    'Customer churn rate increased by 15%',
    'Team expansion slower than planned'
  ]);

  const handleInputChange = (field, value) => {
    setEvaluation({
      ...evaluation,
      [field]: value
    });
  };

  const handleSave = () => {
    alert('Evaluation notes saved successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Startup Progress Evaluation Notes</h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Progress
          </label>
          <textarea
            value={evaluation.productProgress}
            onChange={(e) => handleInputChange('productProgress', e.target.value)}
            placeholder="Assess the startup's product development progress..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Strategy Adequacy
          </label>
          <textarea
            value={evaluation.strategyAdequacy}
            onChange={(e) => handleInputChange('strategyAdequacy', e.target.value)}
            placeholder="Evaluate the effectiveness of their strategic approach..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Market Validation
          </label>
          <textarea
            value={evaluation.marketValidation}
            onChange={(e) => handleInputChange('marketValidation', e.target.value)}
            placeholder="Assess how well they've validated their market..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Execution Efficiency
          </label>
          <textarea
            value={evaluation.executionEfficiency}
            onChange={(e) => handleInputChange('executionEfficiency', e.target.value)}
            placeholder="Evaluate their execution speed and resource utilization..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
            rows="3"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Red Flags (AI-detected)
            </label>
            <span className="text-xs text-gray-500">Auto-detected by AI</span>
          </div>
          <div className="bg-[#FFF9F0] rounded-lg p-3">
            <ul className="space-y-2">
              {aiRedFlags.map((flag, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
          <textarea
            value={evaluation.redFlags}
            onChange={(e) => handleInputChange('redFlags', e.target.value)}
            placeholder="Add your own observations or additional red flags..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00] mt-3"
            rows="2"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium"
        >
          Save Evaluation Notes
        </button>
      </div>
    </div>
  );
};

export default StartupProgressEvaluation;