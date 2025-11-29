import { useDashboardData } from '../hooks/useDashboardData';

const OverviewStatsCard = () => {
  const { data } = useDashboardData();
  
  if (!data) return null;
  
  const { overview } = data;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Overview Snapshot</h2>
          <p className="text-gray-600 text-sm">Welcome back, {overview.name}</p>
          <p className="text-gray-500 text-xs mt-1">{overview.location}</p>
        </div>
        <div className="bg-indigo-100 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {overview.domainTags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-indigo-50 rounded-xl p-4">
          <p className="text-gray-600 text-sm">Total Startups</p>
          <p className="text-2xl font-bold text-indigo-600">{overview.totalStartups}</p>
        </div>
        <div className="bg-indigo-50 rounded-xl p-4">
          <p className="text-gray-600 text-sm">Active Programs</p>
          <p className="text-2xl font-bold text-indigo-600">{overview.activePrograms}</p>
        </div>
        <div className="bg-indigo-50 rounded-xl p-4">
          <p className="text-gray-600 text-sm">Funding Secured</p>
          <p className="text-2xl font-bold text-indigo-600">{overview.fundingSecured}</p>
        </div>
        <div className="bg-indigo-50 rounded-xl p-4">
          <p className="text-gray-600 text-sm">Mentors Available</p>
          <p className="text-2xl font-bold text-indigo-600">{overview.mentorsAvailable}</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewStatsCard;