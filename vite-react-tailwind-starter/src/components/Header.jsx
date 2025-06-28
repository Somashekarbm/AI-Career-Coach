import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import ButtonSpinner from "./ButtonSpinner";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";
import sessionService from "../services/sessionService";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const isLoggedIn = sessionService.isLoggedIn();

  // Handle Logout
  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      sessionService.logout();
      toast.success("Logged out successfully!");
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
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
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
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="hover:opacity-70 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Get Started
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gray-800 dark:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 space-y-2">
            <a href="#features" className="block py-2 text-gray-800 dark:text-white hover:opacity-70">
              Features
            </a>
            <a href="#about" className="block py-2 text-gray-800 dark:text-white hover:opacity-70">
              About
            </a>
            <a href="#contact" className="block py-2 text-gray-800 dark:text-white hover:opacity-70">
              Contact
            </a>
            
            {isLoggedIn && (
              <button 
                onClick={() => navigate("/goal-set")} 
                className="block w-full text-left py-2 text-gray-800 dark:text-white hover:opacity-70"
              >
                Goals
              </button>
            )}

            <button
              onClick={toggleTheme}
              className="block w-full text-left py-2 text-gray-800 dark:text-white hover:opacity-70"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
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
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full text-left py-2 text-gray-800 dark:text-white hover:opacity-70"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


