import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const DeadlineCountdown = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const deadlineTime = new Date(deadline).getTime();
      const difference = deadlineTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({ days, hours, minutes });
        setIsOverdue(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        setIsOverdue(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [deadline]);

  const getStatusColor = () => {
    if (isOverdue) return 'text-red-600 dark:text-red-400';
    if (timeLeft.days <= 3) return 'text-orange-600 dark:text-orange-400';
    if (timeLeft.days <= 7) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getStatusText = () => {
    if (isOverdue) return 'Overdue';
    if (timeLeft.days === 0 && timeLeft.hours === 0) return 'Due today!';
    if (timeLeft.days === 0) return `${timeLeft.hours}h remaining`;
    if (timeLeft.days === 1) return '1 day left';
    return `${timeLeft.days} days left`;
  };

  return (
    <div className={`flex items-center gap-2 text-sm font-medium ${getStatusColor()}`}>
      {isOverdue ? (
        <AlertTriangle size={16} className="text-red-500" />
      ) : (
        <Clock size={16} />
      )}
      <span>{getStatusText()}</span>
    </div>
  );
};

export default DeadlineCountdown; 