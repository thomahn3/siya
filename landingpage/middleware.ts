import jwt from 'jsonwebtoken';

export default function requireAuth(req:, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      jwt.verify(token, process.env.SECRET_KEY);
      next();
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }