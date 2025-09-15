import { Request, Response } from "express";
import { createOrder, getOrderById } from "../services/orderService";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { userId, items, total } = req.body;
    if (!userId || !items || !total) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const order = await createOrder(userId, items, total);
    res.status(201).json({ data: order });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getOrderController = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await getOrderById(orderId);
    res.status(200).json({ data: order });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};