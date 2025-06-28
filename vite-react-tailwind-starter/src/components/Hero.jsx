import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));

  // Listen for token changes
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!Cookies.get("token"));
    };

    // Check on mount
    checkLoginStatus();

    // Listen for storage events (when token is set/removed in other tabs)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for immediate changes
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/goal-set");
    } else {
      navigate("/register");
    }
  };

  return (
    <section className="pt-12 sm:pt-16 px-4 bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-inter">
          Smart career tools, powered by AI
        </h1>
        <p className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Reach your
          <span className="relative inline-block mx-2">
            <span className="bg-blue blur-lg opacity-30 absolute inset-0 rounded"></span>
            <span className="relative text-indigo-600 text-7xl">Dream Goal</span>
          </span>
          with confidence
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleClick}
            className="inline-flex items-center px-8 py-3 text-lg font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-700 transition"
          >
            {isLoggedIn ? "Create Goal" : "Get Started"}
          </button>

          <a
            href="#"
            className="inline-flex items-center px-6 py-3 text-lg font-bold text-gray-900 dark:text-white border-2 border-gray-400 rounded-xl hover:bg-gray-900 hover:text-white transition"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 18 18" fill="none" stroke="currentColor">
              <path d="M8.18 13.43C6.86 14.39 5 13.45 5 11.81V5.44C5 3.80 6.86 2.86 8.18 3.82L12.54 7.01C13.63 7.81 13.63 9.44 12.54 10.24L8.18 13.43Z"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Watch Demo
          </a>
        </div>

        <p className="mt-6 text-base text-gray-500 dark:text-gray-400">
          60-day free trial. No credit card required.
        </p>

        <div className="mt-12">
          <img
            className="mx-auto max-w-4xl w-full transform scale-105"
            src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png"
            alt="Illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

