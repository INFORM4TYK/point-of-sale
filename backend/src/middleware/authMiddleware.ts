import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecret";

interface AuthRequest extends Request {
  userId?: number;
  email?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    req.userId = decoded.id;
    req.email = decoded.email;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
