import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white text-gray-800 min-h-screen transition-colors duration-300">
      <Header />
      <main className="transition-colors duration-300">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
