import React, { useState } from 'react';

const EvaluationWorkspace = () => {
  const [comments, setComments] = useState('');
  const [reviewers] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', role: 'Tech Expert', avatar: 'SJ' },
    { id: 2, name: 'Michael Chen', role: 'Business Advisor', avatar: 'MC' },
    { id: 3, name: 'Priya Sharma', role: 'Investor', avatar: 'PS' }
  ]);

  const [scores, setScores] = useState({
    tech: 8,
    product: 7,
    business: 9,
    financial: 8,
    market: 7,
    team: 9,
    ip: 6
  });

  const handleScoreChange = (category, value) => {
    setScores(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evaluation submitted:', { scores, comments });
    // In a real app, this would submit the evaluation
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Evaluation Workspace</h2>
        <p className="text-gray-600">Multi-reviewer collaboration panel for startup evaluation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviewers Panel */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Reviewers</h3>
            <div className="space-y-3">
              {reviewers.map((reviewer) => (
                <div key={reviewer.id} className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-[#FF6A00] flex items-center justify-center text-white font-bold">
                    {reviewer.avatar}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-800">{reviewer.name}</h4>
                    <p className="text-gray-600 text-sm">{reviewer.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score Summary */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-gray-800 mb-4">Score Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Average Score</span>
                <span className="font-bold text-[#FF6A00]">
                  {Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Highest Score</span>
                <span className="font-bold text-green-600">
                  {Math.max(...Object.values(scores))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lowest Score</span>
                <span className="font-bold text-red-600">
                  {Math.min(...Object.values(scores))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring Panel */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Scoring Panel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(scores).map(([category, score]) => (
                <div key={category} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-800 capitalize">
                      {category === 'ip' ? 'IP' : category}
                    </h4>
                    <span className="font-bold text-[#FF6A00]">{score}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={score}
                    onChange={(e) => handleScoreChange(category, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6A00]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Comments & Notes</h3>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              placeholder="Add your evaluation comments here..."
            ></textarea>
          </div>

          {/* Attachments */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Attachments</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                <button className="font-medium text-[#FF6A00] hover:text-[#e05500]">
                  Upload a file
                </button>
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF, DOC, XLS up to 10MB</p>
            </div>
          </div>

          {/* Final Decision Button */}
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Save Draft
            </button>
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500]"
            >
              Final Decision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationWorkspace;