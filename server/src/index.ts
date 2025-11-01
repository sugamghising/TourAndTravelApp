import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import connectDB from './config/db';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes'
import tourRoutes from './routes/tourRoutes'
import bookingRoutes from './routes/bookingRoutes'
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
    return res.send("Backend running");
})

app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

