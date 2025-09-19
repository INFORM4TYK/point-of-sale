import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
  addUserToOrder,
  markOrderAsPaid,
} from "../models/orderModel";
import { Order } from "../types/Order";
import { HttpError } from "../utils/httpError";

export const createOrderService = async (cartId: number): Promise<Order> => {
  if (!cartId || isNaN(cartId)) throw new HttpError(400, "Invalid cart ID");
  try {
    return await createOrder(cartId);
  } catch (err) {
    throw new Error(`Failed to create order: ${err}`);
  }
};
export const markOrderAsPaidService = async (
  orderId: number
): Promise<Order> => {
  if (!orderId || isNaN(orderId)) throw new HttpError(400, "Invalid order ID");
  try {
    return await markOrderAsPaid(orderId);
  } catch (err) {
    throw new Error(`Failed to mark order as paid: ${err}`);
  }
};
export const addUserToOrderService = async (
  orderId: number,
  customerId: number
): Promise<Order> => {
  try {
    await addUserToOrder(orderId, customerId);
    return getOrderById(orderId);
  } catch (err) {
    throw new HttpError(500, "order/failed-add-user");
  }
};
export const getOrderByIdService = async (orderId: number): Promise<Order> => {
  try {
    return await getOrderById(orderId);
  } catch (err) {
    throw new HttpError(404, "order/not-found");
  }
};

export const getAllOrdersService = async (): Promise<Order[]> => {
  try {
    return await getAllOrders();
  } catch (err) {
    throw new HttpError(500, "order/failed-fetch-all");
  }
};

export const updateOrderService = async (
  orderId: number,
  updates: Partial<{ user_id: number; total: number }>
): Promise<Order> => {
  try {
    return await updateOrder(orderId, updates);
  } catch (err) {
    throw new HttpError(500, "order/failed-update");
  }
};

export const deleteOrderService = async (orderId: number): Promise<void> => {
  try {
    await deleteOrder(orderId);
  } catch (err) {
    throw new HttpError(500, "order/failed-delete");
  }
};
