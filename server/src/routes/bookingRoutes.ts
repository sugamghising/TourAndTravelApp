import express from 'express'
import { cancelBooking, createBooking, getAllBookings, getUserBooking } from '../controllers/bookingController'
import { adminOnly, protect } from '../middleware/authMiddleware';
import { validateBooking } from '../middleware/validation';


const router = express.Router()

router.post('/', protect, validateBooking, createBooking);
router.get('/', protect, getUserBooking);

router.put('/:id', protect, cancelBooking);

router.get('/admin/all', protect, adminOnly, getAllBookings);

export default router;
