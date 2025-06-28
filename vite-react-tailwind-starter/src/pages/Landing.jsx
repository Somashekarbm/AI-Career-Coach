import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="bg-[#121212] text-white">
      <Header showLogout={true} />
      <main>
        <Hero showCreateGoal={true} />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
