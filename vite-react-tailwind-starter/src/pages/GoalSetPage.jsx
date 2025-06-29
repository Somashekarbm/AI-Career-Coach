import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Calendar, 
  Clock, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  X, 
  Search, 
  Filter,
  Tag,
  TrendingUp,
  Info
} from "lucide-react";
import GoalSetHeader from "../components/GoalSetHeader";
import Footer from "../components/Footer";
import UserGreeting from "../components/UserGreeting";
import ProgressBar from "../components/ProgressBar";
import TaskPreview from "../components/TaskPreview";
import DeadlineCountdown from "../components/DeadlineCountdown";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { goalService } from "../services/goalService";
import toast from "react-hot-toast";

const GoalSetPage = () => {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [deleteGoal, setDeleteGoal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [showTooltip, setShowTooltip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [goalPrompt, setGoalPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    dailyHours: "",
    category: "career",
    tags: []
  });

  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All Goals", color: "gray" },
    { id: "career", name: "Career", color: "green" },
    { id: "learning", name: "Learning", color: "blue" },
    { id: "health", name: "Health", color: "red" },
    { id: "personal", name: "Personal", color: "purple" },
    { id: "finance", name: "Finance", color: "yellow" }
  ];

  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "deadline", label: "Deadline" },
    { value: "dailyHours", label: "Daily Hours" },
    { value: "progress", label: "Progress" }
  ];

  // Fetch goals from backend
  const fetchGoals = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory !== "all") params.category = selectedCategory;
      if (sortBy !== "createdAt") params.sortBy = sortBy;
      
      const goalsData = await goalService.getGoals(params);
      setGoals(goalsData);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast.error('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [searchTerm, selectedCategory, sortBy]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const goalData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        dailyHours: parseFloat(formData.dailyHours),
        deadline: new Date(formData.deadline).toISOString()
      };

      if (editingGoal) {
        await goalService.updateGoal(editingGoal.id, goalData);
        toast.success('Goal updated successfully!');
      } else {
        await goalService.createGoal(goalData);
        toast.success('Goal created successfully!');
      }
      
      setFormData({
        title: "",
        description: "",
        deadline: "",
        dailyHours: "",
        category: "career",
        tags: []
      });
      setIsModalOpen(false);
      setEditingGoal(null);
      
      // Refresh goals
      fetchGoals();
    } catch (error) {
      console.error('Error saving goal:', error);
      toast.error(editingGoal ? 'Failed to update goal' : 'Failed to create goal');
    }
  };

  const handleDelete = async (goalId) => {
    try {
      await goalService.deleteGoal(goalId);
      toast.success('Goal deleted successfully!');
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
      setDeleteGoal(null);
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast.error('Failed to delete goal');
    }
  };

  const handleUpdate = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description,
      deadline: goal.deadline ? goal.deadline.split('T')[0] : "",
      dailyHours: goal.dailyHours?.toString() || "",
      category: goal.category,
      tags: goal.tags || []
    });
    setIsModalOpen(true);
  };

  const handleViewTasks = (goalId) => {
    navigate(`/tasks/${goalId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGoal(null);
    setFormData({
      title: "",
      description: "",
      deadline: "",
      dailyHours: "",
      category: "career",
      tags: []
    });
  };

  const getCategoryColor = (category) => {
    const categoryObj = categories.find(cat => cat.id === category);
    return categoryObj ? `tag-${categoryObj.color}` : 'tag-gray';
  };

  const handleGenerateGoal = async () => {
    if (!goalPrompt.trim()) {
      toast.error('Please enter a goal description');
      return;
    }
    
    setIsGenerating(true);
    try {
      // TODO: Implement AI goal generation logic here
      // For now, just show a placeholder message
      toast.success('Goal generation feature coming soon! 🚀');
      setGoalPrompt("");
    } catch (error) {
      console.error('Error generating goal:', error);
      toast.error('Failed to generate goal');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#ffffff] dark:bg-[#121212] text-gray-900 dark:text-white min-h-screen flex flex-col">
      <GoalSetHeader />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Enhanced Header Section */}
        <div className="mb-12">
          {/* User Greeting and Main Title */}
          <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-8 mb-10">
            <div className="flex-1 max-w-4xl">
              <UserGreeting />
              
              {/* Enhanced Smart Goals Title */}
              <div className="mt-6 relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                <h1 className="relative text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-fade-in-up tracking-tight leading-tight">
                  <span className="block">Smart Goals</span>
                  <span className="block text-5xl lg:text-6xl xl:text-7xl mt-3 ml-8">Smarter You!</span>
                </h1>
                
                <div className="mt-6 ml-8">
                  <div className="flex items-center gap-4">
                    <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                    <p className="text-gray-600 dark:text-white text-xl font-medium">
                      Transform your dreams into actionable plans
                    </p>
                  </div>
                  
                  
                  
                  {/* Inspirational Quote */}
                  <div className="mt-20 max-w-2xl ">
                  <blockquote className="mt-6 rounded-md border-l-4 border-indigo-500 bg-muted px-6 py-4 text-muted-foreground dark:bg-gray-800">
      <p className="italic text-base md:text-lg">
        "Small daily improvements are the key to staggering long-term results."
      </p>
      <footer className="mt-2 text-sm text-right text-gray-500 dark:text-gray-400">
        – James Clear
      </footer>
    </blockquote>
</div>

                </div>
              </div>
            </div>

            {/* Goal Generation Section */}
            <div className="xl:w-[420px] xl:flex-shrink-0">
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-8 border border-indigo-100 dark:border-gray-600 shadow-xl backdrop-blur-sm relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800 rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl">✨</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        AI Goal Generator
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Coming Soon
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Describe your goal in natural language and let our AI create a detailed, personalized plan with tasks, deadlines, and daily time allocation.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <textarea
                        value={goalPrompt}
                        onChange={(e) => setGoalPrompt(e.target.value)}
                        placeholder="e.g., I want to learn React and build a portfolio website in 3 months with 2 hours daily..."
                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                        rows={4}
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {goalPrompt.length}/500
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={handleGenerateGoal}
                        disabled={isGenerating || !goalPrompt.trim()}
                        className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                      >
                        {isGenerating ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-xl">🚀</span>
                            <span>Generate Goal</span>
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                      >
                        <Plus size={18} />
                        <span className="hidden sm:inline">Manual</span>
                      </button>
                    </div>
                    
                    {/* Feature highlights */}
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>AI-powered task breakdown</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Smart time allocation</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Progress tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search goals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar pl-10"
            />
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`filter-btn ${
                    selectedCategory === category.id ? 'filter-btn-active' : 'filter-btn-inactive'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <Filter size={16} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="search-bar w-auto"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort by: {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Goals Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
            {goals.map((goal, index) => (
              <div
                key={goal.id}
                className="goal-card bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-fade-in-up shadow-soft"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Goal Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex-1">
                      {goal.title}
                    </h3>
                    <span className={`tag ${getCategoryColor(goal.category)} ml-2`}>
                      {categories.find(cat => cat.id === goal.category)?.name}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {goal.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <ProgressBar progress={goal.completedTasks} total={goal.totalTasks} />
                </div>

                {/* Goal Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <DeadlineCountdown deadline={goal.deadline} />
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock size={16} />
                      <span className="text-sm">{goal.dailyHours} hours/day</span>
                    </div>
                  </div>
                </div>

                {/* Created Date */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Created: {formatDate(goal.createdAt)}</span>
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                    <span className="capitalize">{goal.status}</span>
                  </div>
                </div>

                {/* Task Preview */}
                <TaskPreview tasks={goal.tasks} maxTasks={3} />

                {/* Action Buttons */}
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => handleViewTasks(goal.id)}
                    className="btn-hover flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-1"
                  >
                    <Eye size={16} />
                    View Tasks
                  </button>
                  <button
                    onClick={() => handleUpdate(goal)}
                    className="btn-hover bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteGoal(goal)}
                    className="btn-hover bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && goals.length === 0 && (
          <div className="text-center py-12 flex-1 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 max-w-md mx-auto animate-bounce-in">
              <div className="text-gray-400 mb-4">
                <Plus size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm || selectedCategory !== "all" ? "No matching goals" : "No Goals Yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {searchTerm || selectedCategory !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Start your career with a goal — let our AI plan your path and guide your daily steps!"
                }
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-hover bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
              >
                Create Your First Goal
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Create/Edit Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-custom flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in shadow-soft">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingGoal ? "Edit Goal" : "Create New Goal"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Goal Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="search-bar"
                  placeholder="Enter your goal title"
                />
              </div>

              <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="search-bar"
                  placeholder="Describe your goal"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="search-bar"
                  >
                    {categories.filter(cat => cat.id !== "all").map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Daily Hours
                  </label>
                  <input
                    type="number"
                    name="dailyHours"
                    value={formData.dailyHours}
                    onChange={handleInputChange}
                    required
                    min="0.5"
                    max="24"
                    step="0.5"
                    className="search-bar"
                    placeholder="e.g., 2"
                  />
                </div>
              </div>

              <div className="animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                  className="search-bar"
                />
              </div>

              <div className="flex gap-3 pt-4 animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-hover flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-hover flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  {editingGoal ? (
                    <>
                      <Save size={16} />
                      Update Goal
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Create Goal
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!deleteGoal}
        onClose={() => setDeleteGoal(null)}
        onConfirm={() => handleDelete(deleteGoal?.id)}
        title="Delete Goal"
        message={`Are you sure you want to delete "${deleteGoal?.title}"? This action cannot be undone.`}
        confirmText="Delete Goal"
        type="danger"
      />

      <Footer />
    </div>
  );
};

export default GoalSetPage; 