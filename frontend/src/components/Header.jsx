import React from "react";

const Header = () => {
  return (
    <header className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-white hover:text-red-600">AI Career Coach</h1>
        <nav className="space-x-6 text-white font-medium">
          <a href="#features" className="hover:text-red-400">Features</a>
          <a href="#about" className="hover:text-red-400">About</a>
          <a href="#contact" className="hover:text-red-400">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
