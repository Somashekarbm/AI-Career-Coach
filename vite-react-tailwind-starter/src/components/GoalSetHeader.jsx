import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Moon, Sun, Bell, Menu, Users, CheckSquare } from "lucide-react";
import ButtonSpinner from "./ButtonSpinner";
import { useTheme } from "../context/ThemeContext";

const GoalSetHeader = () => {
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
      window.location.href = "/home#";
    }, 1000);
  };

  return (
    <header className="bg-white dark:bg-black shadow-sm w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Career Coach
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 items-center text-gray-800 dark:text-white">
          {/* Teams */}
          <div className="flex items-center gap-2 hover:opacity-70 transition cursor-pointer">
            <Users size={20} />
            <span>Teams</span>
          </div>

          {/* Today's Tasks Counter */}
          <div className="flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">
            <CheckSquare size={16} />
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              5 Tasks Today
            </span>
          </div>

          {/* Notifications */}
          <button className="hover:opacity-70 transition relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          <button onClick={toggleTheme} className="hover:opacity-70 transition">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            onClick={() => navigate("/landing")} 
            className="hover:opacity-70 transition"
          >
            Dashboard
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
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-black px-6 pb-6 space-y-4 animate-fade-in-down">
          <div className="flex items-center gap-2 text-gray-800 dark:text-white">
            <Users size={20} />
            <span>Teams</span>
          </div>

          <div className="flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 px-3 py-2 rounded-full">
            <CheckSquare size={16} />
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              5 Tasks Today
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-800 dark:text-white">
            <Bell size={20} />
            <span>Notifications (3)</span>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button onClick={toggleTheme} className="text-gray-900 dark:text-white text-xl">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={() => navigate("/landing")} 
              className="hover:opacity-70 transition"
            >
              Dashboard
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

export default GoalSetHeader; 