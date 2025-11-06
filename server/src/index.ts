import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;


// console.log(process.env.FRONTEND_URL);
// const allowedOrigins = [
//     "http://localhost:3000",
//     "https://tour-and-travel-app-frontend.vercel.app",
//     process.env.FRONTEND_URL,
// ].filter(Boolean);



// app.use(
//     cors({
//         origin: function (origin, callback) {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true);
//             } else {
//                 console.warn("❌ Blocked by CORS:", origin);
//                 callback(null, false); // don’t throw
//             }
//         },
//         credentials: true,
//     })
// );


const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Parse multiple frontend URLs (comma-separated)
const allowedOrigins = FRONTEND_URL.split(',').map(url => url.trim());

//middleware
app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => res.send("Backend running"));
app.use(errorHandler);

export default app;

if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}
