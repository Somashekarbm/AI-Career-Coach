import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Goal = () => {
  return (
    <div className="bg-[#121212] text-white">
      <Header showLogout={true} />
      <main>
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Goal;
