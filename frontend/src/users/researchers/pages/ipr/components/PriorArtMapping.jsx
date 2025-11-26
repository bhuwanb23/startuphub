import React from 'react';

const PriorArtMapping = () => {
  // Mock data for visualization
  const citationData = [
    { id: 1, title: 'Quantum Encryption Algorithms', year: 2020, connections: 5 },
    { id: 2, title: 'Secure Data Transmission', year: 2018, connections: 3 },
    { id: 3, title: 'Cryptographic Protocols', year: 2019, connections: 7 },
    { id: 4, title: 'AI in Cybersecurity', year: 2021, connections: 4 },
    { id: 5, title: 'Blockchain Security', year: 2022, connections: 6 }
  ];

  const timelineData = [
    { year: 2018, count: 12 },
    { year: 2019, count: 18 },
    { year: 2020, count: 25 },
    { year: 2021, count: 32 },
    { year: 2022, count: 28 }
  ];

  const topMatches = [
    { id: 1, title: 'Method for Quantum Key Distribution', similarity: 92, type: 'Patent' },
    { id: 2, title: 'Secure Communication System', similarity: 87, type: 'Paper' },
    { id: 3, title: 'Cryptographic Algorithm for Data Protection', similarity: 84, type: 'Patent' },
    { id: 4, title: 'AI-Based Threat Detection', similarity: 78, type: 'Dataset' }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">🌐 Prior-Art Mapping</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Citation Network Graph */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4">Citation Network Graph</h3>
          <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-3">🕸️</div>
              <p className="text-gray-600">Interactive citation network visualization</p>
              <p className="text-sm text-gray-500 mt-2">Nodes represent patents/papers, connections show citations</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
              Expand Network
            </button>
          </div>
        </div>
        
        {/* Timeline of Related Filings */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4">Timeline of Related Filings</h3>
          <div className="h-80 bg-gray-50 rounded-lg p-4">
            <div className="flex items-end h-64 gap-2">
              {timelineData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-[#FF6A00] to-[#FF8C42] rounded-t-lg transition-all hover:opacity-75"
                    style={{ height: `${(item.count / 32) * 100}%` }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-2">{item.year}</div>
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-600 mt-4">
              Number of related filings per year
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Matching Datasets, Papers, Patents */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">Top Matching Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topMatches.map((match) => (
            <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800 text-sm">{match.title}</h4>
                <span className={`text-xs px-2 py-1 rounded ${
                  match.type === 'Patent' ? 'bg-blue-100 text-blue-800' :
                  match.type === 'Paper' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {match.type}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-[#FF6A00]">{match.similarity}%</span>
                <button className="text-xs text-[#FF6A00] hover:text-[#e05500]">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriorArtMapping;