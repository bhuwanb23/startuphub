import React from 'react';

const RightRail = ({ data, activeSection }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">AI Insights</h2>
      <div className="bg-gradient-to-br from-[#FFF5EB] to-[#FF8C42]/20 rounded-xl p-4">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-2">
            🤖
          </div>
          <h3 className="font-bold text-gray-800">AI Assistant</h3>
        </div>
        <p className="text-sm text-gray-700">
          {activeSection === 'traction' && "Strong revenue growth trajectory with healthy customer acquisition rates. Recommend deeper dive into churn metrics."}
          {activeSection === 'technology' && "Excellent tech stack with scalable architecture. Minor concerns about legacy code integration risks."}
          {activeSection === 'ipr' && "Strong IP portfolio with defensive positioning. Consider expedited patent filing in key markets."}
          {activeSection === 'financial' && "Solid financial position with adequate runway. Burn rate optimization opportunities identified."}
          {activeSection === 'market' && "Dominant market position with clear competitive advantages. Expansion opportunities in adjacent segments."}
          {activeSection === 'team' && "Exceptional founding team with complementary skills. Leadership depth could be strengthened."}
          {activeSection === 'risk' && "Moderate legal risks identified. Immediate attention needed for compliance gaps."}
          {activeSection === 'report' && "Final report synthesis complete. Investment recommendation: STRONG BUY with caveats."}
        </p>
      </div>
    </div>
    
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Flags & Alerts</h2>
      <div className="space-y-3">
        {activeSection === 'risk' ? (
          <>
            <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-red-500 mr-2 mt-0.5">⚠️</span>
              <div>
                <div className="font-medium text-red-800">IP Dispute</div>
                <div className="text-xs text-red-600">Former employee claim</div>
              </div>
            </div>
            <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <span className="text-yellow-500 mr-2 mt-0.5">⚠️</span>
              <div>
                <div className="font-medium text-yellow-800">Regulatory Delay</div>
                <div className="text-xs text-yellow-600">EU approval pending</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-green-500 mr-2 mt-0.5">✓</span>
              <div>
                <div className="font-medium text-green-800">Financial Health</div>
                <div className="text-xs text-green-600">18-month runway secured</div>
              </div>
            </div>
            <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <span className="text-yellow-500 mr-2 mt-0.5">!</span>
              <div>
                <div className="font-medium text-yellow-800">Market Competition</div>
                <div className="text-xs text-yellow-600">3 new entrants identified</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Confidence Score</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Overall Assessment</span>
          <span className="font-bold text-[#FF6A00]">87%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00]"
            style={{ width: '87%' }}
          ></div>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          Based on {activeSection === 'report' ? '32' : '28'} data points analyzed
        </div>
      </div>
    </div>
  </div>
);

export default RightRail;