import { Request, Response } from "express"
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json({ message: 'User already Exists.' });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        const token = generateToken(String(user._id));
        res.status(201).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Provide username and password.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email.' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password.' })
        }
        const token = generateToken(String(user._id));

        // res.cookie("token", token, {
        //     httpOnly: true,              // not accessible via JS
        //     secure: process.env.NODE_ENV === "production", // HTTPS only in production
        //     sameSite: "strict",          // prevent CSRF
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error. Please try again.' });
    }
}


// export const logout = async (req: Request, res: Response) => {
//     try {
//         // res.clearCookie('token', {
//         //     httpOnly: true,
//         //     secure: process.env.NODE_ENV === "production",
//         //     sameSite: "strict",
//         // });
//         return res.status(200).json({ message: "Logged out successfully" });
//     } catch (error) {
//         console.error("Logout error:", error);
//         return res.status(500).json({ message: "Server error" });
//     }
// }