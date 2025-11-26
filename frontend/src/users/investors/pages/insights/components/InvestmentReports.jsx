import React, { useState } from 'react';

const InvestmentReports = () => {
  const [region, setRegion] = useState('Global');

  const investmentReports = {
    global: [
      { id: 1, title: 'Global Venture Capital Report 2025', cagr: '12.3%', marketSize: '$385B', growth: '+8.7%', pockets: 'AI, Climate, HealthTech' },
      { id: 2, title: 'Emerging Market Investment Trends', cagr: '18.5%', marketSize: '$127B', growth: '+22.3%', pockets: 'Fintech, E-commerce' }
    ],
    india: [
      { id: 3, title: 'Indian Startup Ecosystem Report', cagr: '22.1%', marketSize: '$42B', growth: '+35.6%', pockets: 'EdTech, HealthTech, FinTech' },
      { id: 4, title: 'Digital India Investment Outlook', cagr: '19.8%', marketSize: '$28B', growth: '+28.4%', pockets: 'SaaS, E-commerce, Mobility' }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">🌍 Global & Indian Investment Reports</h2>
        <p className="text-gray-600">Comprehensive market analysis and investment insights</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          className={`px-4 py-2 rounded-lg transition-all ${
            region === 'Global' 
              ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setRegion('Global')}
        >
          Global Insights 🌐
        </button>
        <button 
          className={`px-4 py-2 rounded-lg transition-all ${
            region === 'India' 
              ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setRegion('India')}
        >
          Indian Market Insights 🇮🇳
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(region === 'Global' ? investmentReports.global : investmentReports.india).map((report) => (
          <div key={report.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
            <h3 className="font-bold text-gray-800">{report.title}</h3>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <div className="text-xs text-gray-600">CAGR</div>
                <div className="font-bold text-[#FF6A00]">{report.cagr}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Market Size</div>
                <div className="font-bold text-[#FF6A00]">{report.marketSize}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">YoY Growth</div>
                <div className="font-bold text-[#FF6A00]">{report.growth}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Hot Pockets</div>
                <div className="text-xs font-medium text-gray-800">{report.pockets}</div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-5">
              <button className="flex-1 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Open Report
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm">
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentReports;