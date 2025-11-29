import React, { useState } from 'react';

const ExpertPanel = () => {
  const [scores, setScores] = useState({
    technology: 8,
    product: 7,
    businessModel: 9,
    financialViability: 8,
    marketRelevance: 7,
    team: 9,
    ip: 6
  });

  const [notes, setNotes] = useState({
    technology: '',
    product: '',
    businessModel: '',
    financialViability: '',
    marketRelevance: '',
    team: '',
    ip: ''
  });

  const handleScoreChange = (category, value) => {
    setScores(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleNotesChange = (category, value) => {
    setNotes(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const categories = [
    { id: 'technology', name: 'Technology', description: 'Technical feasibility and innovation' },
    { id: 'product', name: 'Product', description: 'Product-market fit and UX' },
    { id: 'businessModel', name: 'Business Model', description: 'Revenue streams and scalability' },
    { id: 'financialViability', name: 'Financial Viability', description: 'Financial health and projections' },
    { id: 'marketRelevance', name: 'Market Relevance', description: 'Market size and demand' },
    { id: 'team', name: 'Team', description: 'Founder experience and capability' },
    { id: 'ip', name: 'IP', description: 'Intellectual property protection' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Expert Scoring Panel</h2>
        <p className="text-gray-600">Detailed expert evaluation of startup components</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-gray-50 rounded-xl p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-800">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-[#FF6A00] mr-2">
                  {scores[category.id]}
                </span>
                <span className="text-gray-500">/10</span>
              </div>
            </div>

            {/* Slider */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="10"
                value={scores[category.id]}
                onChange={(e) => handleScoreChange(category.id, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6A00]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>10</span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={notes[category.id]}
                onChange={(e) => handleNotesChange(category.id, e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                placeholder={`Add notes for ${category.name} evaluation...`}
              ></textarea>
            </div>
          </div>
        ))}
      </div>

      {/* Summary and Actions */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">Evaluation Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-[#FF6A00]">
              {Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length}
            </div>
            <div className="text-gray-600 text-sm">Average Score</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.max(...Object.values(scores))}
            </div>
            <div className="text-gray-600 text-sm">Highest Score</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-red-600">
              {Math.min(...Object.values(scores))}
            </div>
            <div className="text-gray-600 text-sm">Lowest Score</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Object.values(scores).filter(score => score >= 8).length}
            </div>
            <div className="text-gray-600 text-sm">High Scores</div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Save Evaluation
          </button>
          <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500]">
            Submit Scores
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertPanel;