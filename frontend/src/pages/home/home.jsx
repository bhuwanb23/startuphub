import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import useSmoothScroll from './hooks/useSmoothScroll';

const Home = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Home;