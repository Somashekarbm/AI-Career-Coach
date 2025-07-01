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
  }
}; 