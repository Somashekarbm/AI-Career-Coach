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
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit3,
  Lock,
  LockIcon
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
  const [showProFeatureDropdown, setShowProFeatureDropdown] = useState(false);
  
  // Refs for click outside detection
  const moodDropdownRef = useRef(null);
  const lifeEventDropdownRef = useRef(null);
  const noteInputRef = useRef(null);
  
  // Day-specific data
  const [dayData, setDayData] = useState({});
  
  const [totalPoints, setTotalPoints] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [todaysTaskCount, setTodaysTaskCount] = useState(0);

  // Add state for editing checkpoints and notes
  const [editingCheckpoint, setEditingCheckpoint] = useState({ taskId: null, idx: null });
  const [checkpointEditValue, setCheckpointEditValue] = useState("");
  const [addingCheckpoint, setAddingCheckpoint] = useState({ taskId: null, value: "" });
  const [editingCheckpointNote, setEditingCheckpointNote] = useState({ taskId: null, idx: null });
  const [checkpointNoteEditValue, setCheckpointNoteEditValue] = useState("");
  const [editingTaskNote, setEditingTaskNote] = useState({ taskId: null });
  const [taskNoteEditValue, setTaskNoteEditValue] = useState("");

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

  // Add useEffect to recalculate today's task count whenever allTasks changes
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const count = allTasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    }).length;
    setTodaysTaskCount(count);
  }, [allTasks]);

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

  // Handler to start editing a checkpoint
  const startEditCheckpoint = (taskId, idx, value) => {
    setEditingCheckpoint({ taskId, idx });
    setCheckpointEditValue(value);
  };

  // Handler to save edited checkpoint
  const saveEditCheckpoint = async (task, idx) => {
    const newCheckpoints = [...(task.checkpoints || [])];
    newCheckpoints[idx] = checkpointEditValue;
    try {
      await goalService.updateCheckpoints(goalId, task.id, newCheckpoints);
      await fetchGoalDetails();
      toast.success("Checkpoint updated!");
    } catch {
      toast.error("Failed to update checkpoint");
    }
    setEditingCheckpoint({ taskId: null, idx: null });
    setCheckpointEditValue("");
  };

  // Handler to remove a checkpoint
  const removeCheckpoint = async (task, idx) => {
    const newCheckpoints = [...(task.checkpoints || [])];
    newCheckpoints.splice(idx, 1);
    try {
      await goalService.updateCheckpoints(goalId, task.id, newCheckpoints);
      await fetchGoalDetails();
      toast.success("Checkpoint removed!");
    } catch {
      toast.error("Failed to remove checkpoint");
    }
  };

  // Handler to add a checkpoint
  const addCheckpoint = async (task) => {
    if (!addingCheckpoint.value.trim()) return;
    const newCheckpoints = [...(task.checkpoints || []), addingCheckpoint.value.trim()];
    try {
      await goalService.updateCheckpoints(goalId, task.id, newCheckpoints);
      await fetchGoalDetails();
      toast.success("Checkpoint added!");
    } catch {
      toast.error("Failed to add checkpoint");
    }
    setAddingCheckpoint({ taskId: null, value: "" });
  };

  // Handler to reorder checkpoints
  const moveCheckpoint = async (task, idx, direction) => {
    const newCheckpoints = [...(task.checkpoints || [])];
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= newCheckpoints.length) return;
    [newCheckpoints[idx], newCheckpoints[targetIdx]] = [newCheckpoints[targetIdx], newCheckpoints[idx]];
    try {
      await goalService.updateCheckpoints(goalId, task.id, newCheckpoints);
      await fetchGoalDetails();
      toast.success("Checkpoint reordered!");
    } catch {
      toast.error("Failed to reorder checkpoint");
    }
  };

  // Handler to start editing a checkpoint note
  const startEditCheckpointNote = (taskId, idx, value) => {
    setEditingCheckpointNote({ taskId, idx });
    setCheckpointNoteEditValue(value);
  };

  // Handler to save edited checkpoint note
  const saveEditCheckpointNote = async (task, idx) => {
    const newNotes = [...(task.checkpointNotes || [])];
    newNotes[idx] = checkpointNoteEditValue;
    try {
      await goalService.updateCheckpointNotes(goalId, task.id, newNotes);
      await fetchGoalDetails();
      toast.success("Checkpoint note updated!");
    } catch {
      toast.error("Failed to update checkpoint note");
    }
    setEditingCheckpointNote({ taskId: null, idx: null });
    setCheckpointNoteEditValue("");
  };

  // Handler to start editing a task note
  const startEditTaskNote = (taskId, value) => {
    setEditingTaskNote({ taskId });
    setTaskNoteEditValue(value || "");
  };

  // Handler to save edited task note
  const saveEditTaskNote = async (task) => {
    try {
      await goalService.updateTaskNote(goalId, task.id, taskNoteEditValue);
      await fetchGoalDetails();
      toast.success("Task note updated!");
    } catch {
      toast.error("Failed to update task note");
    }
    setEditingTaskNote({ taskId: null });
    setTaskNoteEditValue("");
  };

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
      {/* Header - reduce height and padding for consistency */}
      <header className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/goals')}
              className="p-3 hover:bg-indigo-100 dark:hover:bg-gray-800 rounded-full transition-colors shadow"
            >
              <ArrowLeft size={24} className="text-indigo-600 dark:text-indigo-400" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Target size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GoalForge AI
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/landing")}
              className="text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-3 hover:bg-indigo-100 dark:hover:bg-gray-800 rounded-full"
            >
              <Home size={24} />
            </button>
            <button 
              onClick={() => navigate("/teams")}
              className="text-indigo-600 dark:text-indigo-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-3 hover:bg-indigo-100 dark:hover:bg-gray-800 rounded-full"
            >
              <Users size={24} />
            </button>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-gray-800 px-4 py-2 rounded-xl shadow">
              <TrendingUp size={18} className="text-green-500" />
              <span className="font-semibold">{goal.completedTasks || 0} / {goal.totalTasks || 0} Tasks</span>
            </div>
            <MenuDropdown />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6 md:space-y-10">
          {/* Goal Overview */}
          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 rounded-3xl p-4 md:p-8 lg:p-10 shadow-2xl border border-indigo-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
                <Target size={40} className="text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                  {goal.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                  {totalDays > 0 ? `Day ${currentDay} of ${totalDays}` : 'No tasks available'}
                </p>
                {goal.description && (
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-2 max-w-xl">{goal.description}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative">
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e7ff" strokeWidth="10" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="url(#progressGradient)" strokeWidth="10" strokeDasharray="282.74" strokeDashoffset={`${282.74 - (overallProgress / 100) * 282.74}`} strokeLinecap="round" />
                  <defs>
                    <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a21caf" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {Math.round(overallProgress)}%
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Complete</div>
            </div>
          </div>

          {/* Pro Feature: Can't complete today's tasks? */}
          <div className="mb-6 md:mb-8">
            <div className="relative">
              <button
                onClick={() => toast.error('This feature is available for Pro users only.')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 md:px-6 md:py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                <Heart size={20} className="text-pink-200" />
                Can't complete today's tasks? <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-lg flex items-center gap-1"><Lock size={14} /> Pro</span>
              </button>
            </div>
          </div>

          {/* Today's Tasks */}
          <div className="space-y-8">
            {currentDayTasks.length > 0 ? (
              currentDayTasks.map((task, index) => (
                <div key={task.id} className="backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 border border-indigo-100 dark:border-gray-800 shadow-xl group transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-2xl text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-base mb-2">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold">
                          <Calendar size={14} /> {formatDate(task.dueDate)}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${task.priority === 3 ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200' : task.priority === 2 ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200' : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'} text-xs font-semibold`}>
                          <Trophy size={14} /> Priority: {task.priority === 3 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleTaskToggle(task.id)}
                      className="p-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg hover:scale-110 transition-transform"
                    >
                      {task.completed ? (
                        <CheckCircle size={28} className="text-white" />
                      ) : (
                        <Circle size={28} className="text-white/60" />
                      )}
                    </button>
                  </div>
                  {/* Checkpoints UI - vertical stepper/checklist */}
                  {task.checkpoints && (
                    <div className="mt-4 mb-2">
                      <div className="font-semibold text-base text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                        <Sparkles size={18} className="text-indigo-400" /> Checkpoints
                      </div>
                      <ol className="space-y-3 ml-2 border-l-2 border-indigo-200 dark:border-indigo-700 pl-6">
                        {task.checkpoints.map((cp, idx) => (
                          <li key={idx} className="flex items-start gap-3 group">
                            {/* Stepper/checkbox */}
                            <button
                              onClick={() => handleSubtaskToggle(task.id, idx)}
                              className={`mt-1 w-6 h-6 flex items-center justify-center rounded-full border-2 ${task.subtaskStatus && task.subtaskStatus[idx] ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-400' : 'bg-white dark:bg-gray-900 border-indigo-200 dark:border-indigo-700'} shadow transition-all`}
                            >
                              {task.subtaskStatus && task.subtaskStatus[idx] ? <CheckCircle size={18} className="text-white" /> : <Circle size={18} className="text-indigo-300" />}
                            </button>
                            {/* Checkpoint text and actions */}
                            <div className="flex-1 flex flex-col gap-1">
                              {editingCheckpoint.taskId === task.id && editingCheckpoint.idx === idx ? (
                                <input
                                  value={checkpointEditValue}
                                  onChange={e => setCheckpointEditValue(e.target.value)}
                                  onBlur={() => saveEditCheckpoint(task, idx)}
                                  onKeyDown={e => e.key === 'Enter' && saveEditCheckpoint(task, idx)}
                                  className="border border-indigo-300 dark:border-indigo-700 rounded px-2 py-1 text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400"
                                  autoFocus
                                />
                              ) : (
                                <span onClick={() => startEditCheckpoint(task.id, idx, cp)} className="cursor-pointer hover:underline text-base text-gray-800 dark:text-gray-100">
                                  {cp}
                                </span>
                              )}
                              {/* Checkpoint note */}
                              <div className="ml-1">
                                {editingCheckpointNote.taskId === task.id && editingCheckpointNote.idx === idx ? (
                                  <textarea
                                    value={checkpointNoteEditValue}
                                    onChange={e => setCheckpointNoteEditValue(e.target.value)}
                                    onBlur={() => saveEditCheckpointNote(task, idx)}
                                    className="border border-blue-300 dark:border-blue-600 rounded px-2 py-1 text-xs w-56 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 mt-1"
                                    autoFocus
                                  />
                                ) : (
                                  <button onClick={() => startEditCheckpointNote(task.id, idx, (task.checkpointNotes && task.checkpointNotes[idx]) || "")} className="text-xs text-blue-600 dark:text-blue-300 underline mt-1">
                                    {(task.checkpointNotes && task.checkpointNotes[idx]) ? "Edit Note" : "+ Add Note"}
                                  </button>
                                )}
                                {task.checkpointNotes && task.checkpointNotes[idx] && editingCheckpointNote.taskId !== task.id && editingCheckpointNote.idx !== idx && (
                                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{task.checkpointNotes[idx]}</span>
                                )}
                              </div>
                            </div>
                            {/* Actions: reorder, remove */}
                            <div className="flex flex-col gap-1 ml-2">
                              <button onClick={() => moveCheckpoint(task, idx, -1)} disabled={idx === 0} className="p-1 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 disabled:opacity-40"><ArrowUp size={16} /></button>
                              <button onClick={() => moveCheckpoint(task, idx, 1)} disabled={idx === task.checkpoints.length - 1} className="p-1 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900 disabled:opacity-40"><ArrowDown size={16} /></button>
                              <button onClick={() => removeCheckpoint(task, idx)} className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"><Trash2 size={16} /></button>
                            </div>
                          </li>
                        ))}
                        {/* Add checkpoint */}
                        <li className="flex items-center gap-2 mt-2">
                          {addingCheckpoint.taskId === task.id ? (
                            <>
                              <input
                                value={addingCheckpoint.value}
                                onChange={e => setAddingCheckpoint({ taskId: task.id, value: e.target.value })}
                                onBlur={() => addCheckpoint(task)}
                                onKeyDown={e => e.key === 'Enter' && addCheckpoint(task)}
                                className="border border-indigo-300 dark:border-indigo-700 rounded px-2 py-1 text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400"
                                autoFocus
                              />
                              <button onClick={() => addCheckpoint(task)} className="p-1 rounded bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800"><Save size={16} /></button>
                              <button onClick={() => setAddingCheckpoint({ taskId: null, value: "" })} className="p-1 rounded bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800"><X size={16} /></button>
                            </>
                          ) : (
                            <button onClick={() => setAddingCheckpoint({ taskId: task.id, value: "" })} className="text-xs text-green-600 dark:text-green-300 underline font-semibold">+ Add Checkpoint</button>
                          )}
                        </li>
                      </ol>
                    </div>
                  )}
                  {/* Task Note UI - fix double quotes */}
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText size={18} className="text-blue-500" />
                      <span className="font-semibold text-base text-gray-700 dark:text-gray-200">Task Note:</span>
                    </div>
                    <div className="backdrop-blur-md bg-blue-50/60 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 rounded-xl p-4 mt-1 flex items-start gap-3 shadow">
                      <div className="flex-1">
                        {editingTaskNote.taskId === task.id ? (
                          <textarea
                            value={taskNoteEditValue}
                            onChange={e => setTaskNoteEditValue(e.target.value)}
                            onBlur={() => saveEditTaskNote(task)}
                            className="border border-blue-300 dark:border-blue-600 rounded px-2 py-1 text-base w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
                            autoFocus
                          />
                        ) : (
                          <span className={`text-gray-700 dark:text-gray-200 text-base ${task.taskNote ? '' : 'italic text-gray-400'}`}>{typeof task.taskNote === 'string' ? task.taskNote.replace(/^"|"$/g, '') : (task.taskNote || 'No note yet.')}</span>
                        )}
                      </div>
                      <div>
                        {editingTaskNote.taskId === task.id ? (
                          <button
                            onClick={() => saveEditTaskNote(task)}
                            className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => startEditTaskNote(task.id, task.taskNote)}
                            className="ml-2 px-4 py-2 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-700 dark:text-blue-200 rounded-lg text-sm font-semibold shadow"
                          >
                            {task.taskNote ? 'Edit Note' : 'Add Note'}
                          </button>
                        )}
                      </div>
                    </div>
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
          <div className="flex gap-6 mt-12">
            <button 
              onClick={handleComplete}
              disabled={currentDayTasks.length === 0 || !currentDayTasks.every(task => task.completed)}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <Trophy size={24} />
              Complete Day
            </button>
            <button
              onClick={handleUpdate}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Save size={24} />
              Update Timeline
            </button>
          </div>
        </div>
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Timer */}
          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 rounded-2xl p-8 shadow-xl border border-indigo-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Timer size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Focus Timer
              </h3>
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl font-mono font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {formatTime(timerTime)}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                {isTimerRunning ? <Pause size={18} /> : <Play size={18} />}
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => setTimerTime(0)}
                className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors shadow"
              >
                <RotateCcw size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
          {/* Deadline Counter */}
          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 rounded-2xl p-8 shadow-xl border border-indigo-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Clock size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Deadline
              </h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {timeRemaining.days}d {timeRemaining.hours}h
              </div>
              <p className="text-base text-gray-600 dark:text-gray-400">
                remaining
              </p>
            </div>
          </div>
          {/* Day Navigation */}
          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 rounded-2xl p-8 shadow-xl border border-indigo-100 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Calendar size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
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
                className="p-3 hover:bg-indigo-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={22} className="text-indigo-600 dark:text-indigo-400" />
              </button>
              <div className="flex-1 mx-6">
                <input
                  type="range"
                  min="1"
                  max={totalDays}
                  value={currentDay}
                  onChange={(e) => handleDayChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-indigo-200 dark:bg-indigo-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <button
                onClick={() => handleDayChange(currentDay + 1)}
                disabled={currentDay >= totalDays}
                className="p-3 hover:bg-indigo-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight size={22} className="text-indigo-600 dark:text-indigo-400" />
              </button>
            </div>
          </div>
          {/* Auto-save Toggle */}
          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 rounded-2xl p-8 shadow-xl border border-indigo-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">Auto-save</h4>
                <p className="text-base text-gray-600 dark:text-gray-400">Save progress automatically</p>
              </div>
              <button
                onClick={() => setAutoSave(!autoSave)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ${
                  autoSave ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-all duration-300 shadow-lg ${
                    autoSave ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - reduce height and padding for consistency */}
      <Footer className="py-3 md:py-4" />
    </div>
  );
};

export default TaskDetails; 