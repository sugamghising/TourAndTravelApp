import jwt from "jsonwebtoken";

interface JwtPayload {
    id: string;
}

export const generateToken = (id: string) => {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
}