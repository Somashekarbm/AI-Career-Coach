import React, { useState, useEffect } from 'react';
import { goalService } from '../services/goalService';

const UserGreeting = () => {
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await goalService.getUserName();
        setUserName(name);
      } catch (error) {
        console.error('Error fetching user name:', error);
        setUserName('User'); // Fallback name
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();

    // Set greeting based on time of day
    const hour = new Date().getHours();
    let timeGreeting = '';
    
    if (hour < 12) {
      timeGreeting = 'Good Morning';
    } else if (hour < 17) {
      timeGreeting = 'Good Afternoon';
    } else {
      timeGreeting = 'Good Evening';
    }
    
    setGreeting(timeGreeting);
  }, []);

  if (loading) {
    return (
      <div className="mb-4 animate-fade-in-up">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="mb-4 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg uppercase">
            {userName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{userName}</span>! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-inter font-semibold">
            Ready to crush your goals today?
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserGreeting; 