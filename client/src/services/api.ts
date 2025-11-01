import axios from 'axios';
import { Tour, Booking, AuthResponse } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('API URL:', API_URL); // Debug log

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
        const { data } = await api.post('/auth/register', { name, email, password });
        return data;
    },
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const { data } = await api.post('/auth/login', { email, password });
        return data;
    },
};

// Tours API
export const toursAPI = {
    getAll: async (): Promise<Tour[]> => {
        const { data } = await api.get('/tours');
        return data;
    },
    getById: async (id: string): Promise<Tour> => {
        const { data } = await api.get(`/tours/${id}`);
        return data;
    },
    create: async (tourData: Partial<Tour>): Promise<Tour> => {
        const { data } = await api.post('/tours', tourData);
        return data;
    },
    update: async (id: string, tourData: Partial<Tour>): Promise<Tour> => {
        const { data } = await api.put(`/tours/${id}`, tourData);
        return data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/tours/${id}`);
    },
};

// Bookings API
export const bookingsAPI = {
    create: async (tourId: string, date: string): Promise<Booking> => {
        const { data } = await api.post('/bookings', { tourId, date });
        return data;
    },
    getUserBookings: async (): Promise<Booking[]> => {
        const { data } = await api.get('/bookings');
        return data;
    },
    cancel: async (id: string): Promise<Booking> => {
        const { data } = await api.put(`/bookings/${id}`);
        return data;
    },
    getAllBookings: async (): Promise<Booking[]> => {
        const { data } = await api.get('/bookings/admin/all');
        return data;
    },
};

export default api;
