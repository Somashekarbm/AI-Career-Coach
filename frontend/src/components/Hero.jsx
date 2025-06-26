import React from "react";

const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gray-700 text-white px-4 text-center">
      <h2 className="text-4xl md:text-6xl font-bold mb-6">Unlock Your Dream Career with AI</h2>
      <p className="text-lg md:text-xl max-w-xl mb-6">Get personalized career coaching powered by artificial intelligence. Discover your strengths, set goals, and land your ideal job.</p>
      <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition">
        Get Started
      </button>
    </section>
  );
};

export default Hero;
