import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

const users: Array<{ username: string; password: string }> = [];

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body;
      
      const user = users.find((u) => u.username === username);
      
      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return; 
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return; 
      }

      const token = generateToken({ username });
      res.json({ token });
    } catch (error) {
      next(error); 
    }
  }
);

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      users.push({ username, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      next(error); 
    }
  }
);

router.get('/protected', authMiddleware, (req: Request, res: Response) => {
  res.json({ message: 'This is a protected route', user: (req as any).user });
});

export default router;
