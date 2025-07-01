import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const TaskPreview = ({ tasks = [], maxTasks = 3 }) => {
  const displayTasks = tasks.slice(0, maxTasks);
  const completedTasks = tasks.filter(task => task.completed).length;

  if (tasks.length === 0) {
    return (
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          No tasks yet. Add some tasks to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Recent Tasks ({completedTasks}/{tasks.length})
        </h4>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {Math.round((completedTasks / tasks.length) * 100)}% done
        </span>
      </div>
      
      <div className="space-y-1">
        {displayTasks.map((task, index) => (
          <div 
            key={task.id || index}
            className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {task.completed ? (
              <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
            ) : (
              <Circle size={14} className="text-gray-400 flex-shrink-0" />
            )}
            <span className={`text-xs flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
              {task.title}
            </span>
            {task.dueDate && (
              <Clock size={12} className="text-gray-400 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
      
      {tasks.length > maxTasks && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          +{tasks.length - maxTasks} more tasks
        </p>
      )}
    </div>
  );
};

export default TaskPreview; 