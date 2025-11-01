export interface Tour {
    _id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    duration: string;
    images: string[];
    maxGroupSize: number;
    availableDates: string[];
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Booking {
    _id: string;
    user: string;
    tour: Tour | string;
    date: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'paid' | 'unpaid';
    createdAt?: string;
    updatedAt?: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    token?: string;
}

export interface AuthResponse {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    token: string;
}
