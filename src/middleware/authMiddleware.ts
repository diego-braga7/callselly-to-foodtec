import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../utils/jwtUtils';

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' });
      return; 
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ message: 'Invalid token' });
      return; 
    }

    (req as any).user = decoded; 
    next(); 
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
