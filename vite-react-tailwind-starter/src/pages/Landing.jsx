import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
