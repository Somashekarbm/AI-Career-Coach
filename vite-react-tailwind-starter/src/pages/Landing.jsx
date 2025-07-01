import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
