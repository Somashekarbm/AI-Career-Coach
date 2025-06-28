import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Bell, Menu, Users, CheckSquare } from "lucide-react";
import ButtonSpinner from "./ButtonSpinner";
import { useTheme } from "../context/ThemeContext";
import sessionService from "../services/sessionService";

const GoalSetHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  // Handle Logout
  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      sessionService.logout();
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
          <button className="hover:opacity-70 transition">
            <Bell size={20} />
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="hover:opacity-70 transition">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Logout */}
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
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gray-800 dark:text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 space-y-2">
            <div className="flex items-center gap-2 py-2 text-gray-800 dark:text-white">
              <Users size={20} />
              <span>Teams</span>
            </div>
            
            <div className="flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full">
              <CheckSquare size={16} />
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                5 Tasks Today
              </span>
            </div>

            <button className="block w-full text-left py-2 text-gray-800 dark:text-white hover:opacity-70">
              <div className="flex items-center gap-2">
                <Bell size={20} />
                <span>Notifications</span>
              </div>
            </button>

            <button
              onClick={toggleTheme}
              className="block w-full text-left py-2 text-gray-800 dark:text-white hover:opacity-70"
            >
              <div className="flex items-center gap-2">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              </div>
            </button>

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
          </div>
        </div>
      )}
    </header>
  );
};

export default GoalSetHeader; 