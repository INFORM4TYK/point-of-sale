import { Request, Response, NextFunction } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
} from "../services/authService";
import handleResponse from "../utils/handleReponse";
import { getUser } from "../models/userModel";
import { HttpError } from "../utils/httpError";

export const registerController = async (
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

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    handleResponse(res, 200, "Login successful", { user, accessToken });
  } catch (err) {
    next(err);
  }
};
export const logoutController = (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout successful" });
};
export const getCurrentUserController = async (
  req: Request & { userId?: number },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    if (!userId) throw new HttpError(401, "Unauthorized");

    const user = await getUser(userId);
    if (!user) throw new HttpError(401, "Unauthorized");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};
export const refreshController = async (
  req: Request & { userId?: number },
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const accessToken = refreshAccessToken(refreshToken);
    res.json({ token: accessToken });
  } catch (err: any) {
    console.error("Refresh error:", err.message);
    next(err);
  }
};
