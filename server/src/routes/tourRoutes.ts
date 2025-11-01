import express from "express";
import { createTour, deleteTour, getAllTour, getTourById, updateTour } from "../controllers/tourController";
import { adminOnly, protect } from "../middleware/authMiddleware";

const router = express.Router();

// RESTful routes mounted at /api/tours
router.get('/', getAllTour);
router.post('/', protect, adminOnly, createTour);

router.get('/:id', getTourById);
router.put('/:id', protect, adminOnly, updateTour);
router.delete('/:id', protect, adminOnly, deleteTour);

export default router;