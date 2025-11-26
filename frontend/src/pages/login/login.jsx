import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_TYPES } from './constants';

const Login = () => {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState(null);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleUserTypeSelect = (userType) => {
    if (userType.id === 'startup') {
      // Navigate directly to the startup dashboard
      navigate('/startups/dashboard');
    } else if (userType.id === 'investor') {
      // Navigate to the investor login page
      navigate('/login/investor');
    } else if (userType.id === 'researcher') {
      // Navigate directly to the researcher dashboard
      navigate('/researchers/dashboard');
    } else {
      setSelectedUserType(userType);
      // In a real app, you would navigate to a specific login page for this user type
      // For now, we'll just show an alert
      alert(`You selected ${userType.name}. In a real app, this would take you to a specialized login page for ${userType.name}s.`);
    }
  };

  const handleGoBack = () => {
    setSelectedUserType(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-[#FFE4B5] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <button 
            onClick={handleBackToHome}
            className="mb-4 text-[#FF6A00] hover:text-[#FF8C42] transition-colors flex items-center"
          >
            ← Back to Home
          </button>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to StartupHub</h1>
          {!selectedUserType ? (
            <p className="text-gray-600">
              Select your user type to get started
            </p>
          ) : (
            <p className="text-gray-600">
              {selectedUserType.name} Login
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#FF8C42]/30">
          {!selectedUserType ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {USER_TYPES.map((userType) => (
                  <button
                    key={userType.id}
                    onClick={() => handleUserTypeSelect(userType)}
                    className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:shadow-lg transition-all hover:border-[#FF8C42]/30 flex flex-col items-center text-center group"
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${userType.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                      {userType.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{userType.name}</h3>
                    <p className="text-gray-600 text-sm">{userType.description}</p>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-center text-gray-500 mb-4">Or continue with</h3>
                <div className="flex justify-center space-x-4">
                  <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <span className="font-medium text-gray-700">G</span>
                  </button>
                  <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <span className="font-medium text-gray-700">GH</span>
                  </button>
                  <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <span className="font-medium text-gray-700">in</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center mb-6">
                <button 
                  onClick={handleGoBack}
                  className="text-[#FF6A00] hover:text-[#FF8C42] flex items-center"
                >
                  ← Back
                </button>
                <h2 className="text-2xl font-bold text-gray-800 flex-1 text-center">
                  {selectedUserType.name} Portal
                </h2>
                <div className="w-6"></div> {/* Spacer for alignment */}
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${selectedUserType.color} flex items-center justify-center text-3xl mx-auto mb-6`}>
                  {selectedUserType.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {selectedUserType.name}s!</h3>
                <p className="text-gray-600 mb-6">
                  This is a specialized portal for {selectedUserType.name.toLowerCase()}s. 
                  Here you'll find tools and resources tailored to your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg">
                    Login
                  </button>
                  <button className="border-2 border-[#FF8C42] text-[#FF6A00] px-6 py-3 rounded-lg font-semibold hover:bg-[#FF8C42]/10 transition-all">
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;