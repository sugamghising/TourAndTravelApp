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

// CORS configuration - allow multiple origins
const allowedOrigins = [
    'http://localhost:3000',
    'https://tour-and-travel-app-frontend.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // allow cookies
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
    return res.send("Backend running");
})

app.use(errorHandler)

// For Vercel serverless function
export default app;

// Only start server in development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

