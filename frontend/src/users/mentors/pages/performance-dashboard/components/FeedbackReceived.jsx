import React, { useState } from 'react';

const FeedbackReceived = () => {
  const [activeTab, setActiveTab] = useState('startups');
  const [timeFilter, setTimeFilter] = useState('last-month');

  const startupFeedback = [
    { id: 1, startup: 'TechFlow Inc.', rating: 5, feedback: 'Extremely valuable insights on market positioning and competitive analysis.', date: '2023-06-15' },
    { id: 2, startup: 'GreenEnergy Solutions', rating: 4, feedback: 'Helpful guidance on investor pitch and financial modeling.', date: '2023-06-18' },
    { id: 3, startup: 'HealthTrack', rating: 5, feedback: 'Perfect mentor for healthcare regulations and compliance requirements.', date: '2023-06-20' },
    { id: 4, startup: 'FinTech Startup', rating: 4, feedback: 'Clear explanations of complex financial concepts and risk assessment.', date: '2023-06-22' }
  ];

  const aiFeedback = [
    { id: 1, category: 'Clarity', score: 92, sentiment: 'Positive' },
    { id: 2, category: 'Relevance', score: 88, sentiment: 'Positive' },
    { id: 3, category: 'Depth', score: 95, sentiment: 'Excellent' },
    { id: 4, category: 'Impact', score: 90, sentiment: 'Very Good' }
  ];

  const strengths = [
    'Exceptional technical expertise',
    'Clear communication skills',
    'Strategic thinking ability',
    'Patient mentoring approach'
  ];

  const improvementAreas = [
    'Increase session frequency',
    'Provide more hands-on guidance',
    'Share more industry connections',
    'Offer follow-up resources'
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg 
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Feedback Received</h2>
        <div className="flex space-x-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00] text-sm"
          >
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-quarter">Last Quarter</option>
          </select>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('startups')}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'startups'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Startup Feedback
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'ai'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            AI Analysis
          </button>
        </nav>
      </div>

      {activeTab === 'startups' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFF9F0] rounded-xl p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Average Rating</h3>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#FF6A00]">4.7</div>
                  <div className="flex justify-center mt-2">
                    {renderStars(5)}
                  </div>
                  <div className="text-gray-600 mt-2">Based on {startupFeedback.length} reviews</div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF9F0] rounded-xl p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sentiment Analysis</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700">Positive</span>
                    <span className="text-sm font-medium text-gray-800">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700">Neutral</span>
                    <span className="text-sm font-medium text-gray-800">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700">Negative</span>
                    <span className="text-sm font-medium text-gray-800">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Detailed Feedback</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {startupFeedback.map((feedback) => (
                <div key={feedback.id} className="p-5">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-900">{feedback.startup}</h4>
                    <span className="text-sm text-gray-500">{feedback.date}</span>
                  </div>
                  <div className="flex mt-2">
                    {renderStars(feedback.rating)}
                  </div>
                  <p className="text-gray-700 mt-3">{feedback.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFF9F0] rounded-xl p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Feedback Categories</h3>
              <div className="space-y-4">
                {aiFeedback.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                      <span className="text-sm font-medium text-gray-800">{item.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{item.sentiment}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#FFF9F0] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Strengths</h3>
                <ul className="space-y-2">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FFF9F0] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Areas to Improve</h3>
                <ul className="space-y-2">
                  {improvementAreas.map((area, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6A00] mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackReceived;