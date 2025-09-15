import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/authService";
import handleResponse from "../utils/handleReponse";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    handleResponse(res, 201, "User created successfuly", user);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    handleResponse(res, 200, "Login successful", data);
  } catch (err) {
    next(err);
  }
};
