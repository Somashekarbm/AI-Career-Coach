import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, Users, CheckSquare, Home, Target } from "lucide-react";
import MenuDropdown from "./MenuDropdown";

const GoalSetHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-white/20 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Name */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GoalForge AI
              </h1>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-4 items-center">
            {/* Dashboard */}
            <button 
              onClick={() => navigate("/landing")} 
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 flex items-center gap-2"
            >
              <Home size={16} />
              <span>Home</span>
            </button>

            {/* Teams */}
            <button 
              onClick={() => navigate("/teams")} 
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 flex items-center gap-2"
            >
              <Users size={16} />
              <span>Teams</span>
            </button>

            {/* Today's Tasks Counter */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 px-4 py-2 rounded-lg backdrop-blur-sm">
              <CheckSquare size={16} className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                5 Tasks Today
              </span>
            </div>

            {/* Notifications */}
            <button className="p-3 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300 relative group">
              <Bell size={20} className="text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Menu Dropdown */}
            <MenuDropdown />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-white/20 dark:border-gray-700/50 animate-slide-down">
          <div className="px-6 py-4 space-y-3">
            <button 
              onClick={() => navigate("/landing")} 
              className="block w-full text-left py-3 px-4 text-gray-800 dark:text-white hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Home size={20} />
                <span className="font-medium">Home</span>
              </div>
            </button>

            <button 
              onClick={() => navigate("/teams")} 
              className="block w-full text-left py-3 px-4 text-gray-800 dark:text-white hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <Users size={20} />
                <span className="font-medium">Teams</span>
              </div>
            </button>
            
            <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 px-4 py-3 rounded-lg backdrop-blur-sm">
              <CheckSquare size={20} className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                5 Tasks Today
              </span>
            </div>

            <button className="block w-full text-left py-3 px-4 text-gray-800 dark:text-white hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200">
              <div className="flex items-center gap-3">
                <Bell size={20} />
                <span className="font-medium">Notifications</span>
              </div>
            </button>

            {/* Mobile Menu Dropdown */}
            <div className="pt-2">
              <MenuDropdown />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default GoalSetHeader;