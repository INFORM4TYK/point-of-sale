import pool from "../config/db";

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id?: number;
  userId: number;
  items: OrderItem[];
  total: number;
  createdAt?: Date;
}

export const createOrder = async (userId: number, items: OrderItem[], total: number) => {
  const orderRes = await pool.query(
    "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *",
    [userId, total]
  );
  const order = orderRes.rows[0];

  const itemPromises = items.map(item =>
    pool.query(
      "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)",
      [order.id, item.productId, item.quantity]
    )
  );
  await Promise.all(itemPromises);

  return order;
};

export const getOrderById = async (orderId: number) => {
  const orderRes = await pool.query("SELECT * FROM orders WHERE id=$1", [orderId]);
  const itemsRes = await pool.query("SELECT * FROM order_items WHERE order_id=$1", [orderId]);

  if (!orderRes.rows[0]) throw new Error("Order not found");

  return {
    ...orderRes.rows[0],
    items: itemsRes.rows,
  };
};