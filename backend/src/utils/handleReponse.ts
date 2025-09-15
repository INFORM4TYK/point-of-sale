import { Response } from "express";

const handleResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data?: T
) => {
  res.status(status).json({
    status,
    message,
    data: data || null,
  });
};

export default handleResponse;