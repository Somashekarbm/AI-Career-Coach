import React, { useState } from "react"; // ✅ FIXED
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Moon, Sun } from "lucide-react";
import ButtonSpinner from "./ButtonSpinner";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const isLoggedIn = !!Cookies.get("token");

  // Handle Logout
  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      Cookies.remove("token");
      toast.success("Logged out successfully!");
      navigate("/home");
    }, 1500);
  };

  return (
    <header className="bg-white dark:bg-black shadow-md dark:shadow-white  w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Career Coach
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 items-center text-gray-800 dark:text-white">
          <a href="#features" className="hover:opacity-70 transition">Features</a>
          <a href="#about" className="hover:opacity-70 transition">About</a>
          <a href="#contact" className="hover:opacity-70 transition">Contact</a>
          
          {isLoggedIn && (
            <button 
              onClick={() => navigate("/goal-set")} 
              className="hover:opacity-70 transition"
            >
              Goals
            </button>
          )}

          <button onClick={toggleTheme} className="hover:opacity-70 transition">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-700 transition flex items-center gap-2"
            >
              {loggingOut ? (
                <>
                  <ButtonSpinner />
                  <span>Logging out...</span>
                </>
              ) : (
                "Logout"
              )}
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-700 transition"
            >
              Login
            </button>
          )}
        </nav>
        

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            className="text-gray-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
            
      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-black px-6 pb-6 space-y-4 animate-fade-in-down">
          <a href="#features" className="block text-gray-800 dark:text-white">Features</a>
          <a href="#about" className="block text-gray-800 dark:text-white">About</a>
          <a href="#contact" className="block text-gray-800 dark:text-white">Contact</a>
          <button 
            onClick={() => navigate("/goal-set")} 
            className="block text-gray-800 dark:text-white text-left w-full"
          >
            Goals
          </button>

          <div className="flex justify-between items-center mt-4">
            <button onClick={toggleTheme} className="text-gray-900 dark:text-white text-xl">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-700 transition flex items-center gap-2"
              >
                {loggingOut ? (
                  <>
                    <ButtonSpinner />
                    <span>Logging out...</span>
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-700 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
      
    </header>
  );
};

export default Header;


