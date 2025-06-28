import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Calendar, Clock, Edit, Trash2, Eye, Save, X } from "lucide-react";
import GoalSetHeader from "../components/GoalSetHeader";
import Footer from "../components/Footer";

const GoalSetPage = () => {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    dailyHours: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingGoal) {
      // Update existing goal
      setGoals(prev => prev.map(goal => 
        goal.id === editingGoal.id 
          ? { ...goal, ...formData, updatedAt: new Date().toISOString() }
          : goal
      ));
      setEditingGoal(null);
    } else {
      // Create new goal
      const newGoal = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      setGoals(prev => [...prev, newGoal]);
    }
    
    setFormData({
      title: "",
      description: "",
      deadline: "",
      dailyHours: "",
    });
    setIsModalOpen(false);
  };

  const handleDelete = (goalId) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const handleUpdate = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description,
      deadline: goal.deadline,
      dailyHours: goal.dailyHours,
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
    });
  };

  return (
    <div className="bg-[#ffffff] dark:bg-[#121212] text-white min-h-screen flex flex-col">
      <GoalSetHeader />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-black dark:text-white animate-fade-in-up tracking-wide text-shadow-custom">
  <span className="text-6xl text-indigo-600 dark:text-indigo-600 ">G</span>
  <span className="text-black dark:text-white">oal </span>
  <span className="text-6xl text-indigo-600 dark:text-indigo-600 ">S</span>
  <span className="text-black dark:text-white">etting</span>
</h1>




          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-hover bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg"
          >
            <Plus size={20} />
            Create New Goal
          </button>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {goals.map((goal, index) => (
            <div
              key={goal.id}
              className="goal-card bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-fade-in-up"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {goal.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {goal.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar size={16} />
                  <span className="text-sm">Deadline: {formatDate(goal.deadline)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock size={16} />
                  <span className="text-sm">{goal.dailyHours} hours/day</span>
                </div>
              </div>

              <div className="flex gap-2">
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
                  onClick={() => handleDelete(goal.id)}
                  className="btn-hover bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {goals.length === 0 && (
          <div className="text-center py-12 flex-1 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 max-w-md mx-auto animate-bounce-in">
              <div className="text-gray-400 mb-4">
                <Plus size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Goals Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start your career with a goal — let our AI plan your path and guide your daily steps!
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  placeholder="Describe your goal"
                />
              </div>

              <div className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                />
              </div>

              <div className="animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Daily Hours to Dedicate
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  placeholder="e.g., 2"
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

      <Footer />
    </div>
  );
};

export default GoalSetPage; 