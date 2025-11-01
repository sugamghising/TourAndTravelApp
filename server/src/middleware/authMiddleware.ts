import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { verifyToken } from "../utils/generateToken";


export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith('Bearer')) {
    res.status(401).json({ message: 'Unauthorized - No token provided' });
    return;
  }

  const token = authHeaders.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized - Invalid token format' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    // Attach user to request using typed interface
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
}


export const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
}