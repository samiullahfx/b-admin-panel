import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  // Add other response fields if needed
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/users/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Set the authorization header for subsequent requests
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
  },
  
  logout(): void {
    localStorage.removeItem('token');
    // Clear any other auth-related data from localStorage if needed
    // localStorage.removeItem('user');
    // localStorage.removeItem('permissions');
    
    // Optional: Clear any auth headers from the API instance
    delete api.defaults.headers.common['Authorization'];
  },
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
};