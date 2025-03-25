import getAccessToken from '@/utils/getToken';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
    baseURL: (API_BASE_URL || 'http://localhost:4000') + '/api',
    withCredentials: true,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getAccessToken(); // Wait for token resolution
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error fetching token:', error);
        }
        return config;
    },
    (error) => Promise.reject(error) // Ensure errors are properly propagated
);

export default api;
