import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserService, getUserByEmailService} from "../models/userModel";

const JWT_SECRET = "supersecret";

export const registerUser = async ( email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return createUserService(email, hashed);
};

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmailService(email);
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid password");

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  return { user, token };
};
