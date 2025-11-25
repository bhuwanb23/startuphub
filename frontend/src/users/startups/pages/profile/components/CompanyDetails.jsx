import React, { useState } from 'react';

const CompanyDetails = () => {
  const [companyData, setCompanyData] = useState({
    name: 'InnovateX Solutions',
    logo: '',
    stage: 'Series A',
    sector: 'AI & Machine Learning',
    founded: '2020',
    website: 'https://innovatex.com',
    linkedin: 'https://linkedin.com/company/innovatex',
    description: 'We develop cutting-edge AI solutions for enterprise automation.',
    headquarters: 'San Francisco, CA',
    teamSize: '25-50',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save the data to the backend
    console.log('Company data saved:', companyData);
    alert('Company details updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Company Details</h1>
        <p className="text-gray-600 mt-1">Manage your startup's public profile information</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] flex items-center justify-center text-white text-2xl font-bold mb-4 md:mb-0">
              IX
            </div>
            <div className="md:ml-6 text-center md:text-left">
              <h2 className="text-xl font-bold text-gray-800">{companyData.name}</h2>
              <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {companyData.stage}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {companyData.sector}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={companyData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              />
            </div>

            <div>
              <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
                Company Stage
              </label>
              <select
                id="stage"
                name="stage"
                value={companyData.stage}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              >
                <option>Pre-Seed</option>
                <option>Seed</option>
                <option>Series A</option>
                <option>Series B</option>
                <option>Series C+</option>
              </select>
            </div>

            <div>
              <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
                Sector
              </label>
              <input
                type="text"
                id="sector"
                name="sector"
                value={companyData.sector}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              />
            </div>

            <div>
              <label htmlFor="founded" className="block text-sm font-medium text-gray-700 mb-1">
                Founded Year
              </label>
              <input
                type="text"
                id="founded"
                name="founded"
                value={companyData.founded}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={companyData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              />
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={companyData.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="headquarters" className="block text-sm font-medium text-gray-700 mb-1">
                Headquarters
              </label>
              <input
                type="text"
                id="headquarters"
                name="headquarters"
                value={companyData.headquarters}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              />
            </div>

            <div>
              <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
                Team Size
              </label>
              <select
                id="teamSize"
                name="teamSize"
                value={companyData.teamSize}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              >
                <option>1-10</option>
                <option>11-25</option>
                <option>25-50</option>
                <option>50-100</option>
                <option>100+</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Company Description
              </label>
              <textarea
                id="description"
                name="description"
                value={companyData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyDetails;