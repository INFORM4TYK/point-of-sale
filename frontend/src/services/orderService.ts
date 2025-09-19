import api from "../config/api";
import type { Order, OrderItem } from "../types/Order";

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await api.get<{ data: Order[] }>("/orders");
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch orders");
  }
};

export const getOrderById = async (orderId: number): Promise<Order> => {
  try {
    const { data } = await api.get<{ data: Order }>(`/orders/${orderId}`);
    return data.data;
  } catch (err) {
    throw new Error("Failed to fetch order");
  }
};

export const createOrder = async ({
  customerId,
  cartId

}: {
  cartId: string
  customerId?: number;
}): Promise<Order> => {
  try {
    const { data } = await api.post<{ data: Order }>(`/orders/${cartId}`, {
      customerId,
    });
    return data.data;
  } catch (err) {
    throw new Error("Failed to create order");
  }
};

export const updateOrder = async ({
  orderId,
  customerId,
  items,
  total,
}: {
  orderId: number;
  customerId?: number;
  items?: OrderItem[];
  total?: number;
}): Promise<Order> => {
  try {
    const { data } = await api.put<{ data: Order }>(`/orders/${orderId}`, {
      customerId,
      items,
      total,
    });
    return data.data;
  } catch (err) {
    throw new Error("Failed to update order");
  }
};

export const deleteOrder = async (orderId: number): Promise<void> => {
  try {
    await api.delete(`/orders/${orderId}`);
  } catch (err) {
    throw new Error("Failed to delete order");
  }
};
export const markOrderAsPaid = async (orderId: number): Promise<void> => {
  try {
    await api.put(`/orders/${orderId}/paid`);
  } catch (err) {
    throw new Error("Failed to update order");
  }
};

