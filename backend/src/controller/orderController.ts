import { Request, Response, NextFunction } from "express";
import {
  createOrderService,
  getOrderByIdService,
  getAllOrdersService,
  updateOrderService,
  deleteOrderService,
  addUserToOrderService,
} from "../services/orderService";

export const getAllOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).json({ data: orders });
  } catch (err) {
    next(err);
  }
};

export const getOrderByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = Number(req.params.orderId);
    const order = await getOrderByIdService(orderId);
    res.status(200).json({ data: order });
  } catch (err) {
    next(err);
  }
};
export const addCustomerToOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = Number(req.params.orderId);
    const { customerId } = req.body;
    const order = await addUserToOrderService(orderId, customerId);
    res.status(200).json({ data: order });
  } catch (err) {
    next(err);
  }
};

export const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.orderId);
    const order = await createOrderService(cartId);
    res.status(201).json({ data: order, message: "Order created" });
  } catch (err) {
    next(err);
  }
};

export const updateOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = Number(req.params.orderId);
    const updates = req.body;
    const order = await updateOrderService(orderId, updates);
    res.status(200).json({ data: order, message: "Order updated" });
  } catch (err) {
    next(err);
  }
};

export const deleteOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = Number(req.params.orderId);
    await deleteOrderService(orderId);
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    next(err);
  }
};
