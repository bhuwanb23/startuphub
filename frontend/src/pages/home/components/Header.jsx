import React from 'react';
import { useNavigate } from 'react-router-dom';
import useScrollEffect from '../hooks/useScrollEffect';

const Header = () => {
  const { isScrolled } = useScrollEffect();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 py-2' 
        : 'bg-white/80 backdrop-blur-sm border-b border-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] bg-clip-text text-transparent">
            StartupHub
          </h1>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-[#FF6A00] transition-colors font-medium">Features</a>
          <a href="#testimonials" className="text-gray-600 hover:text-[#FF6A00] transition-colors font-medium">Testimonials</a>
          <a href="#stats" className="text-gray-600 hover:text-[#FF6A00] transition-colors font-medium">Stats</a>
          <a href="#contact" className="text-gray-600 hover:text-[#FF6A00] transition-colors font-medium">Contact</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLoginClick}
            className="text-gray-600 hover:text-[#FF6A00] font-medium transition-colors"
          >
            Sign In
          </button>
          <button className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-5 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;