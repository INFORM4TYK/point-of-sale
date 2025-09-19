import { Request, Response, NextFunction } from "express";
import {
  addCustomerService,
  getAllCustomersService,
  getCustomerByIdService,
  updateCustomerService,
  deleteCustomerService,
  searchCustomersService,
} from "../services/customerService";

export const addCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, phone, email } = req.body;
    const customer = await addCustomerService(name, phone, email);
    res.status(201).json({ data: customer });
  } catch (err) {
    next(err);
  }
};

export const getAllCustomersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await getAllCustomersService();
    res.status(200).json({ data: customers });
  } catch (err) {
    next(err);
  }
};

export const getCustomerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const customer = await getCustomerByIdService(id);
    res.status(200).json({ data: customer });
  } catch (err) {
    next(err);
  }
};

export const updateCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const updates = req.body; 
    const customer = await updateCustomerService(id, updates);
    res.status(200).json({ data: customer });
  } catch (err) {
    next(err);
  }
};

export const deleteCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteCustomerService(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const searchCustomersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = String(req.query.q || "");
    const customers = await searchCustomersService(query);
    res.status(200).json({ data: customers });
  } catch (err) {
    next(err);
  }
};
