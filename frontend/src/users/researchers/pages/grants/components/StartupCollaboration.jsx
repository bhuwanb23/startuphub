import React from 'react';

const StartupCollaboration = () => {
  const grants = [
    {
      id: 1,
      title: 'Industry-Academia Joint Fund',
      description: 'Funding for collaborative research projects between academic institutions and industry partners',
      requirements: 'Joint proposal from academia and industry',
      amount: '₹50 Lakhs - ₹2 Crores',
      duration: '2-3 years',
      score: 87,
      startups: [
        { name: 'TechInnovate Pvt Ltd', domain: 'AI & Robotics', match: 92 },
        { name: 'BioTech Solutions', domain: 'Biotechnology', match: 78 },
        { name: 'CleanEnergy Corp', domain: 'Renewable Energy', match: 85 }
      ]
    },
    {
      id: 2,
      title: 'Tech Transfer Initiative',
      description: 'Program to facilitate technology transfer from research labs to startups',
      requirements: 'Technology readiness level TRL 4+',
      amount: '₹25 Lakhs - ₹1 Crore',
      duration: '1-2 years',
      score: 92,
      startups: [
        { name: 'QuantumLeap Technologies', domain: 'Quantum Computing', match: 95 },
        { name: 'NeuroTech Systems', domain: 'Healthcare Tech', match: 88 },
        { name: 'AgriInnovate', domain: 'Agricultural Tech', match: 82 }
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">🤝 Startup Collaboration Grants</h2>
      
      <div className="space-y-6">
        {grants.map((grant) => (
          <div key={grant.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{grant.title}</h3>
                <p className="text-gray-600 mt-2">{grant.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Compatibility Score</div>
                <div className="text-2xl font-bold text-[#FF6A00]">{grant.score}%</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-500">Requirements</div>
                <div className="text-gray-800">{grant.requirements}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Funding Amount</div>
                <div className="text-gray-800">{grant.amount}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Duration</div>
                <div className="text-gray-800">{grant.duration}</div>
              </div>
            </div>
            
            <h4 className="font-medium text-gray-800 mb-3">Potential Startup Matches</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {grant.startups.map((startup, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-800">{startup.name}</h5>
                    <span className="text-lg font-bold text-[#FF6A00]">{startup.match}%</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">{startup.domain}</div>
                  <button className="w-full py-1 text-sm bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
                    Match with Startup
                  </button>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
                View All Potential Matches
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartupCollaboration;