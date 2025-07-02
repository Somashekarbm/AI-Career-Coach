import Cookies from 'js-cookie';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8080/api/v1';

class SessionService {
  constructor() {
    this.inactivityTimeout = 30 * 60 * 1000; // 30 minutes
    this.refreshTimeout = null;
    this.inactivityTimer = null;
    this.isRefreshing = false;
    this.failedQueue = [];
    
    this.setupInactivityDetection();
    this.setupTokenRefresh();
  }

  // Setup inactivity detection
  setupInactivityDetection() {
    const resetInactivityTimer = () => {
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer);
      }
      
      this.inactivityTimer = setTimeout(() => {
        this.handleInactivityTimeout();
      }, this.inactivityTimeout);
    };

    // Reset timer on user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, resetInactivityTimer, true);
    });

    // Initial timer
    resetInactivityTimer();
  }

  // Setup automatic token refresh
  setupTokenRefresh() {
    const token = Cookies.get('token');
    if (token) {
      this.scheduleTokenRefresh();
    }
  }

  // Schedule token refresh
  scheduleTokenRefresh() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }

    // Refresh token 5 minutes before it expires (assuming 1 hour expiration)
    const refreshTime = 55 * 60 * 1000; // 55 minutes
    this.refreshTimeout = setTimeout(() => {
      this.refreshToken();
    }, refreshTime);
  }

  // Handle inactivity timeout
  handleInactivityTimeout() {
    toast.error('Session expired due to inactivity. Please log in again.');
    this.logout();
  }

  // Refresh token
  async refreshToken() {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
      this.logout();
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken: refreshToken
      });

      const { token, refreshToken: newRefreshToken } = response.data;
      
      // Update tokens
      Cookies.set('token', token, { expires: 1 });
      Cookies.set('refreshToken', newRefreshToken, { expires: 7 });
      
      // Process failed queue
      this.failedQueue.forEach(({ resolve }) => {
        resolve();
      });
      this.failedQueue = [];

      // Schedule next refresh
      this.scheduleTokenRefresh();
      
      console.log('Token refreshed successfully');
    } catch (error) {
      console.error('Token refresh failed:', error);
      
      // Process failed queue
      this.failedQueue.forEach(({ reject }) => {
        reject(error);
      });
      this.failedQueue = [];

      // Logout if refresh fails
      this.logout();
    } finally {
      this.isRefreshing = false;
    }
  }

  // Login with session management
  async login(email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, refreshToken } = response.data;
      
      // Set tokens
      Cookies.set('token', token, { expires: 1 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });
      
      // Setup session management
      this.setupTokenRefresh();
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Register with session management
  async register(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);

      const { token, refreshToken } = response.data;
      
      // Set tokens
      Cookies.set('token', token, { expires: 1 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });
      
      // Setup session management
      this.setupTokenRefresh();
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Logout
  logout() {
    // Clear tokens
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    
    // Clear timers
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
    
    // Redirect to login
    window.location.href = '/home';
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!Cookies.get('token');
  }

  // Get token expiration time
  getTokenExpiration() {
    const token = Cookies.get('token');
    if (!token) return null;
    
    try {
      // Decode JWT token to get expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }

  // Get auth headers with automatic refresh
  async getAuthHeaders() {
    const token = Cookies.get('token');
    
    if (!token) {
      throw new Error('No token available');
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Make authenticated request with automatic token refresh
  async makeAuthenticatedRequest(config) {
    try {
      const headers = await this.getAuthHeaders();
      return await axios({
        ...config,
        headers: {
          ...headers,
          ...config.headers
        }
      });
    } catch (error) {
      if (error.response?.status === 401) {
        // Token expired, try to refresh
        try {
          await this.refreshToken();
          const newHeaders = await this.getAuthHeaders();
          return await axios({
            ...config,
            headers: {
              ...newHeaders,
              ...config.headers
            }
          });
        } catch (refreshError) {
          this.logout();
          throw refreshError;
        }
      }
      throw error;
    }
  }

  // Login with Google
  async loginWithGoogle(idToken) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/google-login`, {
        idToken,
      });
      const { token, refreshToken } = response.data;
      Cookies.set('token', token, { expires: 1 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });
      this.setupTokenRefresh();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get current user ID from JWT
  getCurrentUserId() {
    const token = Cookies.get('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.userId || payload.id || null;
    } catch (error) {
      return null;
    }
  }
}

// Create singleton instance
const sessionService = new SessionService();

export default sessionService; 