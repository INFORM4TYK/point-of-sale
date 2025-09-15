import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError";
const errorHandling = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  res.status(500).json({
    status: 500,
    message: "Somthing went wrong",
    error: err.message,
  });
};

export default errorHandling;
