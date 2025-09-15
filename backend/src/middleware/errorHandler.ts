import { Request, Response, NextFunction } from "express";

const errorHandling = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);
  res.status(500).json({
    status: 500,
    message: "Somthing went wrong",
    error: err.message,
  });
};

export default errorHandling
