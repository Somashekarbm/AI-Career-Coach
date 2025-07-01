import React, { useState, useEffect } from 'react';
import { X, Clock, AlertTriangle } from 'lucide-react';
import sessionService from '../services/sessionService';

const SessionTimeoutWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExtending, setIsExtending] = useState(false);

  useEffect(() => {
    if (!sessionService.isLoggedIn()) return;

    const warningTime = 5 * 60 * 1000; // Show warning 5 minutes before timeout
    const checkInterval = 30 * 1000; // Check every 30 seconds

    const checkSessionTimeout = () => {
      const token = sessionService.getTokenExpiration();
      if (!token) return;

      const now = new Date().getTime();
      const expirationTime = new Date(token).getTime();
      const timeUntilExpiration = expirationTime - now;

      if (timeUntilExpiration <= warningTime && timeUntilExpiration > 0) {
        setTimeLeft(Math.ceil(timeUntilExpiration / 1000));
        setShowWarning(true);
      } else if (timeUntilExpiration <= 0) {
        sessionService.logout();
      }
    };

    // Initial check
    checkSessionTimeout();

    // Set up interval
    const interval = setInterval(checkSessionTimeout, checkInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showWarning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          sessionService.logout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showWarning]);

  const handleExtendSession = async () => {
    setIsExtending(true);
    try {
      await sessionService.refreshToken();
      setShowWarning(false);
    } catch (error) {
      console.error('Failed to extend session:', error);
      sessionService.logout();
    } finally {
      setIsExtending(false);
    }
  };

  const handleLogout = () => {
    sessionService.logout();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={24} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Session Timeout Warning
            </h3>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your session will expire in <span className="font-semibold text-red-600">{formatTime(timeLeft)}</span> due to inactivity.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock size={16} />
            <span>Click "Extend Session" to stay logged in</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExtendSession}
            disabled={isExtending}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            {isExtending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Extending...</span>
              </>
            ) : (
              "Extend Session"
            )}
          </button>
          
          <button
            onClick={handleLogout}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
          >
            Logout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutWarning; 