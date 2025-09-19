import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
  addUserToOrder,
} from "../models/orderModel";
import { Order, OrderItem } from "../types/Order";
import { HttpError } from "../utils/httpError";

export const createOrderService = async (
  items: OrderItem[],
  total: number
): Promise<Order> => {
  try {
    return await createOrder(items, total);
  } catch (err) {
    throw new HttpError(500, "order/failed-create");
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
