import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Menu, 
  LogOut, 
  Moon, 
  Sun, 
  User, 
  Settings, 
  HelpCircle, 
  Bell, 
  Shield, 
  BookOpen,
  BarChart3,
  Calendar,
  Target,
  Users,
  Home,
  ChevronDown,
  X
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import sessionService from "../services/sessionService";
import ButtonSpinner from "./ButtonSpinner";

const MenuDropdown = ({ isLoggedIn = true, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      sessionService.logout();
      navigate('/login');
    }, 1000);
  };

  // Handle edit profile
  const handleEditProfile = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  // Handle settings
  const handleSettings = () => {
    setIsOpen(false);
    navigate('/settings');
  };

  // Handle help
  const handleHelp = () => {
    setIsOpen(false);
    navigate('/help');
  };

  // Handle notifications
  const handleNotifications = () => {
    setIsOpen(false);
    navigate('/notifications');
  };

  // Handle analytics
  const handleAnalytics = () => {
    setIsOpen(false);
    navigate('/analytics');
  };

  // Handle calendar
  const handleCalendar = () => {
    setIsOpen(false);
    navigate('/calendar');
  };

  // Handle goals
  const handleGoals = () => {
    setIsOpen(false);
    navigate('/goals');
  };

  // Handle teams
  const handleTeams = () => {
    setIsOpen(false);
    navigate('/teams');
  };

  // Handle home
  const handleHome = () => {
    setIsOpen(false);
    navigate('/landing');
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300 group flex items-center gap-2"
      >
        <Menu size={20} className="text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
        <ChevronDown 
          size={16} 
          className={`text-gray-600 dark:text-gray-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl z-50 animate-slide-down">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Menu
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={16} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="max-h-96 overflow-y-auto">
            {/* Navigation Section */}
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2 uppercase tracking-wider">
                Navigation
              </div>
              <div className="space-y-1">
                <button
                  onClick={handleHome}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  <Home size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium">Dashboard</span>
                </button>
                
                <button
                  onClick={handleGoals}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  <Target size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium">Goals</span>
                </button>
                
                <button
                  onClick={handleTeams}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  <Users size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium">Teams</span>
                </button>
                
                <button
                  onClick={handleCalendar}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  <Calendar size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium">Calendar</span>
                </button>
                
                <button
                  onClick={handleAnalytics}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  <BarChart3 size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium">Analytics</span>
                </button>
              </div>
            </div>

            {/* Account Section */}
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2 uppercase tracking-wider">
                Account
              </div>
              <div className="space-y-1">
                <button
                  onClick={handleEditProfile}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  <User size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium">Edit Profile</span>
                </button>
                
                <button
                  onClick={handleSettings}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  <Settings size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium">Settings</span>
                </button>
                
                <button
                  onClick={handleNotifications}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  <Bell size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium">Notifications</span>
                  <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2 uppercase tracking-wider">
                Preferences
              </div>
              <div className="space-y-1">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  {isDarkMode ? (
                    <Sun size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-yellow-500 transition-colors" />
                  ) : (
                    <Moon size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  )}
                  <span className="font-medium">
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>
                
                <button
                  onClick={handleHelp}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  <HelpCircle size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium">Help & Support</span>
                </button>
                
                <button
                  onClick={() => window.open('/docs', '_blank')}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  <BookOpen size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium">Documentation</span>
                </button>
                
                <button
                  onClick={() => window.open('/privacy', '_blank')}
                  className="w-full flex items-center gap-3 px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
                >
                  <Shield size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium">Privacy Policy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:opacity-50"
            >
              {loggingOut ? (
                <>
                  <ButtonSpinner />
                  <span>Logging out...</span>
                </>
              ) : (
                <>
                  <LogOut size={18} />
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown; 