// src/services/auth.service.ts
const API_URL = 'http://localhost:3000/api/auth';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData extends LoginData {
    name: string;
}

export const AuthService = {
    async login(data: LoginData) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Login failed');
            }
    
            const result = await response.json();
            localStorage.setItem('token', result.token);
            localStorage.setItem('userRole', result.user.role); // Store the role
            return result;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async register(data: RegisterData) {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const result = await response.json();
            // Store the token after successful registration
            localStorage.setItem('token', result.token);
            return result;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    // Get current user profile
    async getProfile() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token');
            }

            const response = await fetch(`${API_URL}/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            return await response.json();
        } catch (error) {
            console.error('Profile fetch error:', error);
            throw error;
        }
    },

    // Logout
    logout() {
        localStorage.removeItem('token');
    }
};

export default AuthService;
