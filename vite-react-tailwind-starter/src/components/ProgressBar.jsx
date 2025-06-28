import React, { useState, useEffect } from 'react';

const ProgressBar = ({ progress = 0, total = 100, animate = true }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(progress);
    }
  }, [progress, animate]);

  const percentage = Math.min((animatedProgress / total) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Progress
        </span>
        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>{animatedProgress} completed</span>
        <span>{total} total</span>
      </div>
    </div>
  );
};

export default ProgressBar; 