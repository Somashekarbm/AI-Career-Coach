import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserGreeting = () => {
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Get user name from localStorage or cookies (you can modify this based on your auth system)
    const storedName = localStorage.getItem('userName') || Cookies.get('userName') || 'User';
    setUserName(storedName);

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