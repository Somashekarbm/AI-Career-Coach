import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const GoalSetHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();


  // Handle Logout
  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {

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

          <button onClick={toggleTheme} className="hover:opacity-70 transition">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>


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