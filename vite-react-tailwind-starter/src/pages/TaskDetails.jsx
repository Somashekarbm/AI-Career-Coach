import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Bell, 
  Menu, 
  ChevronDown, 
  CheckCircle, 
  Circle,
  Calendar,
  Clock,
  TrendingUp,
  Save,
  ArrowLeft,
  ArrowRight,
  ChevronDown as ChevronDownIcon,
  X,
  FileText,
  Target,
  Zap,
  Star,
  Heart,
  Brain,
  Trophy,
  Users,
  Home,
  BarChart3,
  Activity,
  Layers,
  Sparkles,
  Timer,
  CheckSquare,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import Footer from "../components/Footer";
import MenuDropdown from "../components/MenuDropdown";
import { goalService } from "../services/goalService";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

const TaskDetails = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [goal, setGoal] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [totalDays, setTotalDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(0);
  
  // Dropdown states
  const [showMoodDropdown, setShowMoodDropdown] = useState(false);
  const [showLifeEventDropdown, setShowLifeEventDropdown] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);
  
  // Refs for click outside detection
  const moodDropdownRef = useRef(null);
  const lifeEventDropdownRef = useRef(null);
  const noteInputRef = useRef(null);
  
  // Day-specific data
  const [dayData, setDayData] = useState({});
  
  const [totalPoints, setTotalPoints] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  const moodOptions = [
    { value: "motivated", label: "Motivated", emoji: "💪", color: "from-emerald-500 to-green-600" },
    { value: "neutral", label: "Neutral", emoji: "😐", color: "from-blue-500 to-cyan-600" },
    { value: "tired", label: "Tired", emoji: "😴", color: "from-orange-500 to-red-600" }
  ];

  const lifeEventOptions = [
    { value: "health", label: "Health Issue", emoji: "🏥", color: "from-red-500 to-pink-600" },
    { value: "family", label: "Family Emergency", emoji: "👨‍👩‍👧‍👦", color: "from-purple-500 to-indigo-600" },
    { value: "others", label: "Others", emoji: "📝", color: "from-gray-500 to-slate-600" }
  ];

  // Helper to parse subtasks from description (if present)
  const parseSubtasks = (description) => {
    // Example: "Subtasks: ["Step 1", "Step 2"]" in description
    try {
      const match = description.match(/Subtasks:\s*(\[.*\])/);
      if (match) {
        return JSON.parse(match[1]);
      }
    } catch (e) {}
    return null;
  };

  useEffect(() => {
    fetchGoalDetails();
  }, [goalId]);

  // Progress calculation (updates on allTasks change)
  useEffect(() => {
    if (!allTasks.length) return;
    const completedTasks = allTasks.filter(task => task.completed).length;
    const progress = (completedTasks / allTasks.length) * 100;
    setOverallProgress(progress);
  }, [allTasks]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moodDropdownRef.current && !moodDropdownRef.current.contains(event.target)) {
        setShowMoodDropdown(false);
      }
      if (lifeEventDropdownRef.current && !lifeEventDropdownRef.current.contains(event.target)) {
        setShowLifeEventDropdown(false);
      }
      if (noteInputRef.current && !noteInputRef.current.contains(event.target)) {
        setShowNoteInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update fetchGoalDetails to fix totalDays calculation
  const fetchGoalDetails = async () => {
    try {
      setLoading(true);
      const goalData = await goalService.getGoalById(goalId);
      setGoal(goalData);
      
      if (goalData.tasks && goalData.tasks.length > 0) {
        setAllTasks(goalData.tasks);
        // Find the earliest and latest dueDate among all tasks
        const sortedTasks = [...goalData.tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        const startDate = new Date(sortedTasks[0].dueDate);
        const endDate = new Date(sortedTasks[sortedTasks.length - 1].dueDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        const diffTime = endDate.getTime() - startDate.getTime();
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setTotalDays(days);
        // Find today's task index (1-based)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTaskIndex = sortedTasks.findIndex(task => {
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate.getTime() === today.getTime();
        });
        setCurrentDay(todayTaskIndex >= 0 ? todayTaskIndex + 1 : 1);
      } else {
        setTotalDays(0);
        setCurrentDay(1);
      }
      setOverallProgress(goalData.progressPercentage || 0);
    } catch (error) {
      console.error('Error fetching goal details:', error);
      toast.error('Failed to load goal details');
      navigate('/goals');
    } finally {
      setLoading(false);
    }
  };

  // Handle subtask toggle
  const handleSubtaskToggle = async (taskId, subtaskIdx) => {
    let newStatusArray = [];
    setAllTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;
      let subtasks = parseSubtasks(task.description) || [];
      if (!task.subtaskStatus) {
        // Initialize subtaskStatus if not present
        task.subtaskStatus = Array(subtasks.length).fill(false);
      }
      const newStatus = [...task.subtaskStatus];
      newStatus[subtaskIdx] = !newStatus[subtaskIdx];
      newStatusArray = newStatus;
      // If all subtasks complete, mark task as complete
      const allComplete = newStatus.every(Boolean);
      return {
        ...task,
        subtaskStatus: newStatus,
        completed: allComplete
      };
    }));
    // Persist to backend
    try {
      await goalService.updateSubtaskStatus(goalId, taskId, newStatusArray);
      toast.success('Checkpoint updated!');
    } catch (error) {
      toast.error('Failed to update checkpoint');
      // Optionally, re-sync if backend fails
      await fetchGoalDetails();
    }
  };

  // 2. Optimistic UI update and backend persistence for task completion
  const handleTaskToggle = async (taskId) => {
    // Optimistically update UI
    setAllTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    try {
      // Call backend to persist
      await goalService.completeTask(goalId, taskId);
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
      // Optionally, re-sync if backend fails
      await fetchGoalDetails();
    }
  };

  // 3. Subtask (checkpoint) persistence requires backend support
  // To persist subtask completion, you need to:
  // - Extend the GoalTask model in the backend to store subtaskStatus (array of booleans)
  // - Add an endpoint to update subtaskStatus for a task
  // - Update the frontend to call this endpoint in handleSubtaskToggle
  // (Current implementation only persists main task completion)

  // 4. MongoDB index suggestions (add these to your backend setup):
  // db.goaltasks.createIndex({ goalId: 1 })
  // db.goaltasks.createIndex({ userId: 1 })
  // db.goaltasks.createIndex({ dueDate: 1 })

  const handleUpdate = () => {
    const currentDayData = dayData[currentDay] || { mood: "", lifeEvent: "", note: "" };
    
    // Update timeline based on mood and life event
    if (currentDayData.mood || currentDayData.lifeEvent) {
      const updates = [];
      if (currentDayData.mood) updates.push(`mood: ${moodOptions.find(m => m.value === currentDayData.mood)?.label}`);
      if (currentDayData.lifeEvent) updates.push(`life event: ${lifeEventOptions.find(l => l.value === currentDayData.lifeEvent)?.label}`);
      if (currentDayData.note) updates.push('note added');
      
      toast.success(`Timeline updated for Day ${currentDay}! (${updates.join(', ')})`);
      // TODO: Implement actual timeline update logic based on mood and life event
    } else {
      toast.error('Please select at least one option to update timeline');
    }
  };

  const handleComplete = () => {
    const currentDayTasks = getCurrentDayTasks();
    const allCompleted = currentDayTasks.every(task => task.completed);
    
    if (!allCompleted) {
      toast.error('Please complete all tasks for today before proceeding');
      return;
    }
    
    if (currentDay < totalDays) {
      setCurrentDay(currentDay + 1);
      toast.success(`Day ${currentDay} completed! Moving to day ${currentDay + 1}`);
    } else {
      toast.success('Congratulations! You have completed all days!');
    }
  };

  const handleDayChange = (newDay) => {
    if (newDay >= 1 && newDay <= totalDays) {
      setCurrentDay(newDay);
    }
  };

  const updateDayData = (field, value) => {
    setDayData(prev => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        [field]: value
      }
    }));
  };

  const getCurrentDayTasks = () => {
    if (currentDay <= 0 || allTasks.length === 0) return [];

    // Find the earliest dueDate among all tasks (start date)
    const sortedTasks = [...allTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    const startDate = new Date(sortedTasks[0].dueDate);
    startDate.setHours(0, 0, 0, 0);

    // Calculate the date for the selected day
    const selectedDate = new Date(startDate);
    selectedDate.setDate(startDate.getDate() + (currentDay - 1));
    selectedDate.setHours(0, 0, 0, 0);

    // Return all tasks whose dueDate matches the selected date (ignoring time)
    return allTasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === selectedDate.getTime();
    });
  };

  const calculateTimeRemaining = () => {
    if (!goal?.deadline) return { days: 0, hours: 0 };
    
    const now = new Date();
    const deadline = new Date(goal.deadline);
    const diff = deadline - now;
    
    if (diff <= 0) return { days: 0, hours: 0 };
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return { days, hours };
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const timeRemaining = calculateTimeRemaining();
  const currentDayTasks = getCurrentDayTasks();
  const currentDayData = dayData[currentDay] || { mood: "", lifeEvent: "", note: "" };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-16 bg-white dark:bg-gray-800 rounded-xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-96 bg-white dark:bg-gray-800 rounded-xl"></div>
              <div className="h-96 bg-white dark:bg-gray-800 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Goal Not Found</h1>
            <button
              onClick={() => navigate('/goals')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Goals
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/goals')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  GoalForge AI
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/landing")}
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Home size={20} />
              </button>
              <button 
                onClick={() => navigate("/teams")}
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Users size={20} />
              </button>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                <TrendingUp size={16} className="text-green-500" />
                <span className="font-medium">{goal.completedTasks || 0} / {goal.totalTasks || 0} Tasks</span>
              </div>
              <MenuDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Goal Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {goal.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {totalDays > 0 ? `Day ${currentDay} of ${totalDays}` : 'No tasks available'}
                    </p>
                    {goal.description && (
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{goal.description}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {Math.round(overallProgress)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Task Management */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Layers size={20} className="text-white" />
                  </div>
                  Today's Tasks
                </h3>
                
                {/* Debug button to generate tasks */}
                {currentDayTasks.length === 0 && (
                  <button
                    onClick={async () => {
                      try {
                        const result = await goalService.generateTasks(goalId);
                        toast.success(result);
                        // Refresh the page data
                        await fetchGoalDetails();
                      } catch (error) {
                        console.error('Error generating tasks:', error);
                        toast.error('Failed to generate tasks');
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Generate Tasks (Debug)
                  </button>
                )}
              </div>

              {/* Task Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Mood Selection */}
                <div className="relative" ref={moodDropdownRef}>
                  <button 
                    onClick={() => setShowMoodDropdown(!showMoodDropdown)}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 px-4 py-3 rounded-xl font-medium flex items-center justify-between transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Brain size={18} className="text-indigo-600" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentDayData.mood ? moodOptions.find(m => m.value === currentDayData.mood)?.label : "Select Mood"}
                      </span>
                    </div>
                    <ChevronDownIcon size={16} className="text-gray-500" />
                  </button>
                  
                  {showMoodDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-10 overflow-hidden">
                      {moodOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            updateDayData('mood', option.value);
                            setShowMoodDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-3 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                        >
                          <div className={`w-8 h-8 bg-gradient-to-r ${option.color} rounded-lg flex items-center justify-center`}>
                            <span className="text-white text-sm">{option.emoji}</span>
                          </div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Life Event Selection */}
                <div className="relative" ref={lifeEventDropdownRef}>
                  <button 
                    onClick={() => setShowLifeEventDropdown(!showLifeEventDropdown)}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 px-4 py-3 rounded-xl font-medium flex items-center justify-between transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Heart size={18} className="text-pink-600" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentDayData.lifeEvent ? lifeEventOptions.find(l => l.value === currentDayData.lifeEvent)?.label : "Life Event"}
                      </span>
                    </div>
                    <ChevronDownIcon size={16} className="text-gray-500" />
                  </button>
                  
                  {showLifeEventDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-10 overflow-hidden">
                      {lifeEventOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            updateDayData('lifeEvent', option.value);
                            setShowLifeEventDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-3 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                        >
                          <div className={`w-8 h-8 bg-gradient-to-r ${option.color} rounded-lg flex items-center justify-center`}>
                            <span className="text-white text-sm">{option.emoji}</span>
                          </div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Note Input */}
                <div className="relative" ref={noteInputRef}>
                  <button
                    onClick={() => setShowNoteInput(!showNoteInput)}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-3 transition-all duration-200"
                  >
                    <FileText size={18} className="text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">{currentDayData.note ? "Edit Note" : "Add Note"}</span>
                  </button>
                  
                  {showNoteInput && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-10 p-4">
                      <textarea
                        value={currentDayData.note}
                        onChange={(e) => updateDayData('note', e.target.value)}
                        placeholder="Add a note about your day..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        rows={3}
                      />
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setShowNoteInput(false)}
                          className="px-3 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-4">
                {currentDayTasks.length > 0 ? (
                  currentDayTasks.map((task, index) => (
                    <div key={task.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                          {String.fromCharCode(65 + index)}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {task.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar size={14} className="text-blue-500" />
                              <span>{formatDate(task.dueDate)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Trophy size={14} className="text-yellow-500" />
                              <span>Priority: {task.priority === 3 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleTaskToggle(task.id)}
                          className="p-3 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 group-hover:scale-110"
                        >
                          {task.completed ? (
                            <CheckCircle size={24} className="text-green-500" />
                          ) : (
                            <Circle size={24} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Tasks for Today</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {totalDays > 0 ? 'You\'re all caught up! Check back tomorrow for your next tasks.' : 'No tasks have been generated for this goal yet.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={handleComplete}
                  disabled={currentDayTasks.length === 0 || !currentDayTasks.every(task => task.completed)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <Trophy size={20} />
                  Complete Day
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <Save size={20} />
                  Update Timeline
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Timer */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Timer size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Focus Timer
                </h3>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-mono font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {formatTime(timerTime)}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={() => setTimerTime(0)}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <RotateCcw size={16} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Deadline Counter */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Deadline
                </h3>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {timeRemaining.days}d {timeRemaining.hours}h
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  remaining
                </p>
              </div>
            </div>

            {/* Day Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Calendar size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Navigation
                </h3>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Day {currentDay} of {totalDays}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => handleDayChange(currentDay - 1)}
                  disabled={currentDay <= 1}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
                
                <div className="flex-1 mx-4">
                  <input
                    type="range"
                    min="1"
                    max={totalDays}
                    value={currentDay}
                    onChange={(e) => handleDayChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <button
                  onClick={() => handleDayChange(currentDay + 1)}
                  disabled={currentDay >= totalDays}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowRight size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Auto-save Toggle */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Auto-save</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Save progress automatically</p>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                    autoSave ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-lg ${
                      autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TaskDetails; 