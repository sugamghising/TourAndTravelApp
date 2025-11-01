import { Request, Response } from "express"
import Tour from "../models/Tour"

export const getAllTour = async (req: Request, res: Response) => {
    try {
        const tours = await Tour.find().sort({ createdAt: -1 })
        if (!tours || tours.length === 0) {
            return res.status(404).json({ message: 'No Tour Available.' })
        }
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tours', error: (error as Error).message });
    }
}

export const getTourById = async (req: Request, res: Response) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not Found.' })
        }
        res.json(tour);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tour.', error: (error as Error).message });
    }
}

export const createTour = async (req: Request, res: Response) => {
    try {
        const { title, description, location, price, duration, images, maxGroupSize, availableDates } = req.body;

        // Validate required fields
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Create new tour with authenticated user as creator
        const tour = await Tour.create({
            title,
            description,
            location,
            price,
            duration,
            images,
            maxGroupSize,
            availableDates,
            createdBy: req.user._id
        });

        res.status(201).json(tour);

    } catch (error) {
        res.status(500).json({ message: 'Failed to create Tour', error: (error as Error).message })
    }
};


export const deleteTour = async (req: Request, res: Response) => {
    try {
        const deleted = await Tour.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Tour not found' });
        res.json({ message: 'Tour deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete tour', error: (error as Error).message });
    }
};

export const updateTour = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Only allow creator or admin to update
        if (tour.createdBy.toString() !== String(req.user._id) && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this tour' });
        }

        const updatedTour = await Tour.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedTour);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update tour', error: (error as Error).message });
    }
};