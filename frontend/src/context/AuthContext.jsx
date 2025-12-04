import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            const { customer, token } = response.data;

            // Clear any existing admin session
            localStorage.removeItem('admin');
            localStorage.removeItem('adminToken');

            localStorage.setItem('user', JSON.stringify(customer));
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(customer);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const adminLogin = async (email, password) => {
        try {
            const response = await axios.post('/admin/login', { email, password });
            const { admin, token } = response.data;

            // Clear any existing customer session
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null); // Clear user state

            localStorage.setItem('admin', JSON.stringify(admin));
            localStorage.setItem('adminToken', token);
            return { success: true, admin, token };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Admin Login failed'
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('/auth/register', userData);
            const { customer, token } = response.data;

            // Clear any existing admin session
            localStorage.removeItem('admin');
            localStorage.removeItem('adminToken');

            localStorage.setItem('user', JSON.stringify(customer));
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(customer);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const updateProfile = async (userId, userData) => {
        try {
            const response = await axios.put(`/customers/${userId}`, userData);
            const updatedUser = response.data.customer;

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Profile update failed'
            };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, adminLogin, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
