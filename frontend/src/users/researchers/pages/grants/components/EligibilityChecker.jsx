import React, { useState } from 'react';

const EligibilityChecker = () => {
  const [eligibilityScore, setEligibilityScore] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    researchArea: '',
    experience: '',
    publications: '',
    institution: '',
    collaboration: ''
  });

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const checkEligibility = () => {
    // Simulate AI eligibility check
    const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
    setEligibilityScore(score);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">🎯 Eligibility Score Checker</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4">Upload Research Paper</h3>
          <div 
            className="border-2 border-dashed border-[#FF8C42] rounded-xl p-8 text-center bg-[#FFF5EB]/30 hover:bg-[#FFF5EB]/50 transition-colors cursor-pointer"
            onClick={() => document.getElementById('file-upload').click()}
          >
            <div className="text-4xl mb-3">📄</div>
            <h4 className="font-medium text-gray-800 mb-2">Drag & Drop your research paper</h4>
            <p className="text-sm text-gray-600 mb-4">or click to browse your device</p>
            <button className="py-2 px-4 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
              Select File
            </button>
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx"
            />
          </div>
          {file && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">📄</div>
                  <div>
                    <div className="font-medium text-gray-800">{file.name}</div>
                    <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                </div>
                <button 
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Form Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4">Fill Information Form</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Research Area</label>
              <input
                type="text"
                name="researchArea"
                value={formData.researchArea}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                placeholder="e.g., Quantum Computing, Biotechnology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Research Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                placeholder="e.g., 5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Publications</label>
              <input
                type="number"
                name="publications"
                value={formData.publications}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                placeholder="e.g., 12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                placeholder="e.g., IIT Delhi, Stanford University"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous Industry Collaboration</label>
              <select
                name="collaboration"
                value={formData.collaboration}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Check Eligibility Button */}
      <div className="mt-6 text-center">
        <button 
          onClick={checkEligibility}
          className="px-6 py-3 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium"
        >
          Generate Eligibility Score
        </button>
      </div>
      
      {/* Results Section */}
      {eligibilityScore !== null && (
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4">Eligibility Results</h3>
          <div className="flex flex-col items-center">
            <div className={`w-32 h-32 rounded-full ${getScoreBg(eligibilityScore)} flex items-center justify-center mb-6`}>
              <span className={`text-4xl font-bold ${getScoreColor(eligibilityScore)}`}>{eligibilityScore}%</span>
            </div>
            <h4 className={`text-xl font-bold mb-2 ${getScoreColor(eligibilityScore)}`}>
              {eligibilityScore >= 80 ? 'High Eligibility' : 
               eligibilityScore >= 60 ? 'Moderate Eligibility' : 'Low Eligibility'}
            </h4>
            <p className="text-gray-600 text-center mb-6">
              {eligibilityScore >= 80 ? 'Great! You have a high chance of qualifying for most grants.' : 
               eligibilityScore >= 60 ? 'You have a moderate chance. Consider improving specific areas.' : 
               'You may need to strengthen your profile before applying.'}
            </p>
            
            <div className="w-full max-w-md">
              <h5 className="font-medium text-gray-800 mb-3">Recommendations to Improve Eligibility</h5>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="text-green-500 mr-2">✓</div>
                  <span className="text-gray-700">Publish 2-3 more papers in high-impact journals</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mr-2">✓</div>
                  <span className="text-gray-700">Collaborate with industry partners on pilot projects</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mr-2">✓</div>
                  <span className="text-gray-700">Attend international conferences to build network</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mr-2">✓</div>
                  <span className="text-gray-700">Apply for smaller grants to build track record</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityChecker;