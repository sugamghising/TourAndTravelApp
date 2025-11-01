import { Request, Response } from "express";
import Booking from "../models/Booking";

export const createBooking = async (req: Request, res: Response) => {
    try {
        const { tourId, date } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const booking = await Booking.create({
            user: req.user._id,
            tour: tourId,
            date,
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create booking', error: (error as Error).message });
    }
}

export const getUserBooking = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const bookings = await Booking.find({ user: req.user._id }).populate('tour');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bookings', error: (error as Error).message });
    }
}

export const cancelBooking = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (booking.user.toString() !== String(req.user._id)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        booking.status = 'cancelled';
        await booking.save();
        res.json({ message: 'Booking cancelled', booking });
    } catch (error) {
        res.status(500).json({ message: 'Failed to cancel booking', error: (error as Error).message });
    }
};

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find().populate('user tour');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch all bookings', error: (error as Error).message });
    }
};