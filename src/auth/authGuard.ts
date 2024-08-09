import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Function to handle user authentication
export const authGuard = (req: Request, res: Response, next: NextFunction) => {
    // Add your authentication logic here
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}