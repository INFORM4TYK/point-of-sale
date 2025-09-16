import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserService, getUserByEmailService } from "../models/userModel";
import { HttpError } from "../utils/httpError";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateTokens = (user: any) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      jti: Math.random().toString(36).substring(2, 10),
    },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, jti: Math.random().toString(36).substring(2, 10) },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export const registerUser = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return createUserService(email, hashed);
};
export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmailService(email);
  if (!user) throw new HttpError(404, "auth/user-not-found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new HttpError(401, "auth/invalid-password");

  const { accessToken, refreshToken } = generateTokens(user);
  return { user, accessToken, refreshToken };
};

export const refreshAccessToken = (refreshToken: string) => {
  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;

    const accessToken = jwt.sign({ id: payload.id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    return accessToken;
  } catch {
    throw new HttpError(401, "auth/invalid-refresh-token");
  }
};
