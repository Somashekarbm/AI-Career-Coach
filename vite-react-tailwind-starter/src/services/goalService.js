import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const getAuthHeaders = () => {
  const token = Cookies.get('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const goalService = {
  // Get all goals with optional filtering and sorting
  async getGoals(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.category) queryParams.append('category', params.category);
    if (params.search) queryParams.append('search', params.search);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    
    const url = `${API_BASE_URL}/goals${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch goals');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw error;
    }
  },

  // Get a specific goal by ID
  async getGoalById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch goal');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching goal:', error);
      throw error;
    }
  },

  // Create a new goal
  async createGoal(goalData) {
    try {
      const response = await fetch(`${API_BASE_URL}/goals`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(goalData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create goal');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  },

  // Update an existing goal
  async updateGoal(id, goalData) {
    try {
      const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(goalData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update goal');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  },

  // Delete a goal
  async deleteGoal(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete goal');
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  },

  // Get user name
  async getUserName() {
    try {
      const response = await fetch(`${API_BASE_URL}/goals/user/name`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user name');
      }
      
      return await response.text();
    } catch (error) {
      console.error('Error fetching user name:', error);
      throw error;
    }
  }
}; 