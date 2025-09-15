import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserService, getUserByEmailService } from "../models/userModel";
import { HttpError } from "../utils/httpError";

const JWT_SECRET = "supersecret";

export const registerUser = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return createUserService(email, hashed);
};

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmailService(email);
  if (!user) throw new HttpError(404, "auth/user-not-found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new HttpError(401, "auth/invalid-password");

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "8h",
  });
  return { user, token };
};
