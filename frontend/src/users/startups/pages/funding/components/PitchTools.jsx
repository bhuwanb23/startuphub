import React, { useState } from 'react';

const PitchTools = () => {
  const [activeTab, setActiveTab] = useState('pitch-deck');
  const [deckTitle, setDeckTitle] = useState('StartupHub - AI-Powered Diagnostics');
  const [deckContent, setDeckContent] = useState({
    problem: 'Early disease detection remains challenging with traditional methods, leading to delayed treatments and poor outcomes.',
    solution: 'Our AI-powered diagnostic platform uses machine learning to analyze medical imaging with 98% accuracy, enabling early detection.',
    market: 'The global diagnostics market is $85B and growing at 6.2% annually, with AI adoption increasing 35% year-over-year.',
    businessModel: 'SaaS subscription model with tiered pricing: $500/month for clinics, $2000/month for hospitals, with implementation fees.',
    traction: 'Pilot with 3 major hospitals showing 40% faster diagnosis times and 95% user satisfaction. Raised $1.2M in Seed funding.',
    team: 'Founders with 15+ years in healthcare tech, ML engineers from Stanford, and medical advisors from Mayo Clinic.',
    ask: 'Seeking $5M Series A to expand to 50 hospitals, hire 20 engineers, and enter European markets.',
  });
  
  // Mock data for pitch feedback
  const feedback = [
    {
      id: 1,
      reviewer: 'Dr. Sarah Johnson',
      role: 'Healthcare Investor',
      rating: 4.5,
      comment: 'Strong problem-solution fit. Consider adding more competitive analysis.',
      date: '2024-06-15',
    },
    {
      id: 2,
      reviewer: 'Alex Thompson',
      role: 'Venture Partner',
      rating: 4.2,
      comment: 'Market size is compelling. Traction section needs more metrics.',
      date: '2024-06-12',
    },
  ];

  // Mock data for pitch templates
  const templates = [
    {
      id: 1,
      name: 'Classic 10-Slide Deck',
      description: 'Traditional pitch structure with problem, solution, market, and team',
      slides: 10,
    },
    {
      id: 2,
      name: 'Investor Quick Pitch',
      description: 'Condensed version for quick meetings and email outreach',
      slides: 5,
    },
    {
      id: 3,
      name: 'Demo Day Presentation',
      description: 'Extended format for accelerator demo days with detailed metrics',
      slides: 15,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pitch Tools</h1>
        <p className="text-gray-600 mt-1">Create, refine, and perfect your investor pitch deck</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Pitch Insight</h2>
            <p className="text-gray-700 mt-1">
              Your pitch deck has strong traction metrics but could benefit from more competitive analysis. 
              Add 2-3 direct competitors and your differentiation strategy.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pitch-deck')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'pitch-deck'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Pitch Deck Builder
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'feedback'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Feedback & Reviews
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Templates
          </button>
        </div>

        {/* Pitch Deck Builder */}
        {activeTab === 'pitch-deck' && (
          <div className="mt-6">
            <div className="mb-4">
              <input
                type="text"
                value={deckTitle}
                onChange={(e) => setDeckTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00] text-lg font-bold"
                placeholder="Pitch Deck Title"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2">Problem Statement</h3>
                  <textarea
                    value={deckContent.problem}
                    onChange={(e) => setDeckContent({...deckContent, problem: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    rows="3"
                    placeholder="Describe the problem your startup solves..."
                  />
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2">Solution</h3>
                  <textarea
                    value={deckContent.solution}
                    onChange={(e) => setDeckContent({...deckContent, solution: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    rows="3"
                    placeholder="Explain your solution..."
                  />
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2">Market Opportunity</h3>
                  <textarea
                    value={deckContent.market}
                    onChange={(e) => setDeckContent({...deckContent, market: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    rows="3"
                    placeholder="Describe your target market..."
                  />
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2">Business Model</h3>
                  <textarea
                    value={deckContent.businessModel}
                    onChange={(e) => setDeckContent({...deckContent, businessModel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    rows="3"
                    placeholder="Explain how you make money..."
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2">Traction</h3>
                  <textarea
                    value={deckContent.traction}
                    onChange={(e) => setDeckContent({...deckContent, traction: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    rows="3"
                    placeholder="Show your progress and metrics..."
                  />
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2">Team</h3>
                  <textarea
                    value={deckContent.team}
                    onChange={(e) => setDeckContent({...deckContent, team: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    rows="3"
                    placeholder="Introduce your team..."
                  />
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2">Ask</h3>
                  <textarea
                    value={deckContent.ask}
                    onChange={(e) => setDeckContent({...deckContent, ask: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    rows="3"
                    placeholder="What are you raising and how will you use it..."
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button className="px-6 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium">
                Save Deck
              </button>
              <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Preview
              </button>
              <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Export PDF
              </button>
              <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Request Review
              </button>
            </div>
          </div>
        )}

        {/* Feedback & Reviews */}
        {activeTab === 'feedback' && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Expert Feedback</h3>
            <div className="space-y-4">
              {feedback.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">{item.reviewer}</h4>
                      <p className="text-gray-600 text-sm">{item.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-bold text-gray-800">{item.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{item.date}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">{item.comment}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                      Respond
                    </button>
                    <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                      Request Revision
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Request Feedback</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-3xl mb-2">👥</div>
                  <h4 className="font-bold text-gray-800">Investor Network</h4>
                  <p className="text-gray-600 text-sm mt-1">Get feedback from active investors</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-3xl mb-2">🎓</div>
                  <h4 className="font-bold text-gray-800">Mentor Panel</h4>
                  <p className="text-gray-600 text-sm mt-1">Expert advice from seasoned entrepreneurs</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-3xl mb-2">🤖</div>
                  <h4 className="font-bold text-gray-800">AI Review</h4>
                  <p className="text-gray-600 text-sm mt-1">Instant feedback from our AI pitch analyzer</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates */}
        {activeTab === 'templates' && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Pitch Deck Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-3xl mb-4">📄</div>
                  <h4 className="text-lg font-bold text-gray-800">{template.name}</h4>
                  <p className="text-gray-600 text-sm mt-2">{template.description}</p>
                  <div className="mt-4 text-sm text-gray-500">{template.slides} slides</div>
                  <div className="mt-4">
                    <button className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                      Use Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-[#FFF5EB] rounded-lg border border-[#FFD7B5]">
              <h4 className="font-bold text-[#FF6A00]">Pro Tip</h4>
              <p className="text-sm mt-2">
                Customize your pitch deck for each investor. Research their portfolio and tailor your messaging 
                to show how your startup aligns with their investment thesis.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pitch Analytics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Pitch Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">12</div>
            <div className="text-sm text-gray-600">Decks Created</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">8</div>
            <div className="text-sm text-gray-600">Reviews Received</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">4.3</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">24</div>
            <div className="text-sm text-gray-600">Investor Views</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchTools;