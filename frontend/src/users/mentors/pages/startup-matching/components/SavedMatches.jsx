import React from 'react';

const SavedMatches = ({ savedStartups, onRemove, onCompare, onSchedule }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Saved Matches / Shortlist</h2>
        <span className="bg-[#FF6A00] text-white rounded-full px-3 py-1 text-sm">
          {savedStartups.length} saved
        </span>
      </div>

      {savedStartups.length === 0 ? (
        <div className="text-center py-8">
          <div className="bg-[#FFF2DC] rounded-full p-3 inline-block mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <p className="text-gray-600">No saved matches yet</p>
          <p className="text-gray-500 text-sm mt-1">Save startups from the recommendations to see them here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedStartups.map((startup) => (
            <div key={startup.id} className="flex items-center justify-between p-3 bg-[#FFF9F0] rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#FF6A00] flex items-center justify-center text-white font-bold">
                  {startup.logo}
                </div>
                <div className="ml-3">
                  <h3 className="font-bold text-gray-800">{startup.name}</h3>
                  <div className="flex items-center">
                    <span className="text-xs px-2 py-1 bg-[#FFF2DC] text-[#FF6A00] rounded-full mr-2">
                      {startup.sector}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {startup.stage}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onRemove(startup.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={() => onCompare(startup)}
                  className="px-3 py-1 bg-white border border-[#FF6A00] text-[#FF6A00] rounded-lg hover:bg-[#FFF2DC] transition-colors text-sm"
                >
                  Compare
                </button>
                <button 
                  onClick={() => onSchedule(startup)}
                  className="px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors text-sm"
                >
                  Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {savedStartups.length > 0 && (
        <div className="mt-6 flex space-x-3">
          <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium">
            Compare Selected
          </button>
          <button className="flex-1 py-2 border border-[#FF6A00] text-[#FF6A00] rounded-lg hover:bg-[#FFF2DC] transition-colors font-medium">
            Export List
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedMatches;