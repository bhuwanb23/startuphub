import React, { useState } from 'react';
import RecommendedStartups from './components/RecommendedStartups';
import Filters from './components/Filters';
import GapBasedMatching from './components/GapBasedMatching';
import StartupReadinessScore from './components/StartupReadinessScore';
import MentorFitScore from './components/MentorFitScore';
import SavedMatches from './components/SavedMatches';
import AcceptRejectModal from './components/AcceptRejectModal';

const StartupMatching = () => {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  const [savedStartups, setSavedStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for startups
  const [startups] = useState([
    {
      id: 1,
      name: 'TechFlow Inc.',
      sector: 'AI',
      stage: 'Seed',
      logo: 'T',
      gapTag: 'Needs AI expertise',
      mentorFitScore: 92,
      problemStatement: 'AI-powered workflow automation platform for enterprise clients'
    },
    {
      id: 2,
      name: 'GreenEnergy Solutions',
      sector: 'Clean Energy',
      stage: 'Series A',
      logo: 'G',
      gapTag: 'Strategy Gap',
      mentorFitScore: 87,
      problemStatement: 'Solar panel efficiency optimization using machine learning'
    },
    {
      id: 3,
      name: 'HealthTrack',
      sector: 'Healthcare',
      stage: 'Pre-seed',
      logo: 'H',
      gapTag: 'Product Development Gap',
      mentorFitScore: 78,
      problemStatement: 'Wearable health monitoring device for chronic disease management'
    },
    {
      id: 4,
      name: 'FinTech Pro',
      sector: 'FinTech',
      stage: 'Growth',
      logo: 'F',
      gapTag: 'Tech Architecture Gap',
      mentorFitScore: 95,
      problemStatement: 'Digital banking platform for underserved communities'
    },
    {
      id: 5,
      name: 'EduTech Innovations',
      sector: 'EdTech',
      stage: 'Seed',
      logo: 'E',
      gapTag: 'Market Validation Gap',
      mentorFitScore: 82,
      problemStatement: 'Personalized learning platform using AI-driven content recommendation'
    },
    {
      id: 6,
      name: 'AgriTech Dynamics',
      sector: 'Agriculture',
      stage: 'Idea',
      logo: 'A',
      gapTag: 'Team Building Gap',
      mentorFitScore: 75,
      problemStatement: 'Precision farming solutions using IoT sensors and data analytics'
    }
  ]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleViewStartup = (startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const handleAcceptMatch = (startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const handleSaveToShortlist = (startupId) => {
    const startup = startups.find(s => s.id === startupId);
    if (startup && !savedStartups.some(s => s.id === startupId)) {
      setSavedStartups([...savedStartups, startup]);
    }
  };

  const handleRemoveFromShortlist = (startupId) => {
    setSavedStartups(savedStartups.filter(s => s.id !== startupId));
  };

  const handleCompareStartups = (startup) => {
    alert(`Comparing ${startup.name} with other saved startups`);
  };

  const handleScheduleSession = (startup) => {
    alert(`Scheduling session with ${startup.name}`);
  };

  const handleModalAccept = (startup) => {
    alert(`Accepted match with ${startup.name}`);
    setIsModalOpen(false);
  };

  const handleModalReject = (startup) => {
    alert(`Rejected match with ${startup.name}`);
    setIsModalOpen(false);
  };

  // Filter startups based on search term and filters
  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          startup.sector.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For simplicity, we're not implementing all filter logic here
    return matchesSearch;
  });

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">AI Startup Matching</h1>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex bg-white rounded-lg border border-gray-300">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-[#FF6A00] text-white' : 'text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-r-lg ${viewMode === 'list' ? 'bg-[#FF6A00] text-white' : 'text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Recommended Startups */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended Startups</h2>
            <RecommendedStartups 
              startups={filteredStartups}
              onViewStartup={handleViewStartup}
              onAcceptMatch={handleAcceptMatch}
              onSaveToShortlist={handleSaveToShortlist}
            />
          </div>

          {/* Gap-Based Matching and Startup Readiness Score */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <GapBasedMatching />
            <StartupReadinessScore />
          </div>

          {/* Mentor Fit Score */}
          <div className="mb-6">
            <MentorFitScore />
          </div>

          {/* Saved Matches */}
          <div>
            <SavedMatches 
              savedStartups={savedStartups}
              onRemove={handleRemoveFromShortlist}
              onCompare={handleCompareStartups}
              onSchedule={handleScheduleSession}
            />
          </div>
        </div>
      </div>

      {/* Accept/Reject Modal */}
      <AcceptRejectModal 
        startup={selectedStartup}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={handleModalAccept}
        onReject={handleModalReject}
      />
    </div>
  );
};

export default StartupMatching;