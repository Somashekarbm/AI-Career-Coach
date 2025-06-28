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
      timeGreeting = 'Good morning';
    } else if (hour < 17) {
      timeGreeting = 'Good afternoon';
    } else {
      timeGreeting = 'Good evening';
    }
    
    setGreeting(timeGreeting);
  }, []);

  if (loading) {
    return (
      <div className="mb-6 animate-fade-in-up">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="mb-6 animate-fade-in-up">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        {greeting}, <span className="text-indigo-600 dark:text-indigo-400 font-bold">{userName}</span>! 👋
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-1">
        Ready to crush your goals today?
      </p>
    </div>
  );
};

export default UserGreeting; 