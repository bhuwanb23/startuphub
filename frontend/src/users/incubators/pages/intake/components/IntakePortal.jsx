import React, { useState } from 'react';

const IntakePortal = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    email: '',
    phone: '',
    website: '',
    sector: '',
    stage: '',
    teamSize: '',
    description: ''
  });

  const eligibilityChecklist = [
    { id: 1, text: 'Startup is less than 5 years old', checked: false },
    { id: 2, text: 'Registered business entity', checked: false },
    { id: 3, text: 'Minimum viable product (MVP)', checked: false },
    { id: 4, text: 'At least 2 founding members', checked: false },
    { id: 5, text: 'No existing incubation program', checked: false }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (id) => {
    // In a real app, this would update the checklist state
    console.log(`Checkbox ${id} toggled`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real app, this would submit the form data
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Our Incubator</h1>
          <p className="text-lg mb-6">Join our ecosystem of innovative startups and accelerate your growth journey.</p>
          <button className="bg-white text-[#FF6A00] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Apply Now
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Application Form */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Application Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Startup Name</label>
                  <input
                    type="text"
                    name="startupName"
                    value={formData.startupName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Founder Name</label>
                  <input
                    type="text"
                    name="founderName"
                    value={formData.founderName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  >
                    <option value="">Select Sector</option>
                    <option value="tech">Technology</option>
                    <option value="health">Healthcare</option>
                    <option value="finance">FinTech</option>
                    <option value="energy">Clean Energy</option>
                    <option value="education">EdTech</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  >
                    <option value="">Select Stage</option>
                    <option value="idea">Idea</option>
                    <option value="mvp">MVP</option>
                    <option value="early">Early Traction</option>
                    <option value="growth">Growth</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                  <input
                    type="number"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF6A00] text-white py-3 rounded-lg font-bold hover:bg-[#e05500] transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>

          {/* Eligibility Checklist and Progress */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Eligibility Checklist</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <ul className="space-y-3">
                {eligibilityChecklist.map((item) => (
                  <li key={item.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`check-${item.id}`}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="h-5 w-5 text-[#FF6A00] rounded focus:ring-[#FF6A00]"
                    />
                    <label htmlFor={`check-${item.id}`} className="ml-3 text-gray-700">
                      {item.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Application Progress</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                <span className="text-sm font-medium text-gray-700">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#FF6A00] h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-800">Basic Information</h3>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-800">Business Details</h3>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                    3
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-800">Document Upload</h3>
                    <p className="text-sm text-gray-600">In Progress</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                    4
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-800">Review & Submit</h3>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakePortal;