import { Request, Response, NextFunction } from 'express';

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    next();
};

export const validateBooking = (req: Request, res: Response, next: NextFunction) => {
    const { tourId, date } = req.body;

    if (!tourId || !date) {
        return res.status(400).json({ message: 'Tour ID and date are required' });
    }

    if (new Date(date) < new Date()) {
        return res.status(400).json({ message: 'Booking date must be in the future' });
    }

    next();
};
