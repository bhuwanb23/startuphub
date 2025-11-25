import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-[#FFE4B5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
          <p className="text-gray-600">
            {isLogin 
              ? 'Sign in to your account' 
              : 'Create a new account'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#FF8C42]/30">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 font-semibold transition-colors ${
                isLogin
                  ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-4 font-semibold transition-colors ${
                !isLogin
                  ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <div className="p-6">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>

        <div className="text-center mt-6 text-gray-600">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              className="text-[#FF6A00] font-semibold hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;