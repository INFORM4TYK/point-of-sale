import { Order, OrderItem, createOrder as createOrderModel, getOrderById as getOrderByIdModel } from "../models/orderModel";

export const createOrder = async (userId: number, items: OrderItem[], total: number): Promise<Order> => {
  return await createOrderModel(userId, items, total);
};

export const getOrderById = async (orderId: number): Promise<Order> => {
  return await getOrderByIdModel(orderId);
};