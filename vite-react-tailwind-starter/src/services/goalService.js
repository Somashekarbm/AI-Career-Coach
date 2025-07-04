import sessionService from './sessionService';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const goalService = {
  // Get all goals with optional filtering and sorting
  async getGoals(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.category) queryParams.append('category', params.category);
    if (params.search) queryParams.append('search', params.search);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    
    const url = `${API_BASE_URL}/goals${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    try {
      const response = await sessionService.makeAuthenticatedRequest({
        method: 'GET',
        url: url,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw error;
    }
  },

  // Get a specific goal by ID
  async getGoalById(id) {
    try {
      const response = await sessionService.makeAuthenticatedRequest({
        method: 'GET',
        url: `${API_BASE_URL}/goals/${id}`,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching goal:', error);
      throw error;
    }
  },

  // Create a new goal
  async createGoal(goalData) {
    try {
      const response = await sessionService.makeAuthenticatedRequest({
        method: 'POST',
        url: `${API_BASE_URL}/goals`,
        data: goalData,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  },

  // Manually generate tasks for a goal (for debugging)
  async generateTasks(goalId) {
    try {
      const response = await sessionService.makeAuthenticatedRequest({
        method: 'POST',
        url: `${API_BASE_URL}/goals/${goalId}/generate-tasks`,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error generating tasks:', error);
      throw error;
    }
  },

  // Update an existing goal
  async updateGoal(id, goalData) {
    try {
      const response = await sessionService.makeAuthenticatedRequest({
        method: 'PUT',
        url: `${API_BASE_URL}/goals/${id}`,
        data: goalData,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  },

  // Delete a goal
  async deleteGoal(id) {
    try {
      const response = await sessionService.makeAuthenticatedRequest({
        method: 'DELETE',
        url: `${API_BASE_URL}/goals/${id}`,
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  },

  // Get user name
  async getUserName() {
    try {
      const response = await sessionService.makeAuthenticatedRequest({
        method: 'GET',
        url: `${API_BASE_URL}/goals/user/name`,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching user name:', error);
      throw error;
    }
  },

  // Get today's task for a specific goal
  async getTodaysTask(goalId) {
    try {
      const response = await sessionService.makeAuthenticatedRequest({
        method: 'GET',
        url: `${API_BASE_URL}/goals/${goalId}/today-task`,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching today\'s task:', error);
      throw error;
    }
  },

  // Mark a task as completed
  async completeTask(goalId, taskId) {
    try {
      const response = await sessionService.makeAuthenticatedRequest({
        method: 'PUT',
        url: `${API_BASE_URL}/goals/${goalId}/tasks/${taskId}/complete`,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error completing task:', error);
      throw error;
    }
  },

  // Update subtask (checkpoint) completion status for a task
  async updateSubtaskStatus(goalId, taskId, subtaskStatus) {
    try {
      const response = await sessionService.makeAuthenticatedRequest({
        method: 'PUT',
        url: `${API_BASE_URL}/goals/${goalId}/tasks/${taskId}/subtasks`,
        data: subtaskStatus,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating subtask status:', error);
      throw error;
    }
  }
}; 