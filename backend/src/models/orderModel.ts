import pool from "../config/db";
import { OrderItem } from "../types/Order";
import { getCartItems, getCartTotal } from "./cartModel";

export const createOrder = async (cartId: number) => {
  const client = await pool.connect();
  try {

    const cartItems = await getCartItems(cartId);

    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const total = await getCartTotal(cartId);

    const orderRes = await client.query(
      "INSERT INTO orders (customer_id, total) VALUES (NULL, $1) RETURNING *",
      [total]
    );
    const order = orderRes.rows[0];

    for (const item of cartItems) {
      await client.query(
        "INSERT INTO order_items (order_id, product_id, amount, price, category) VALUES ($1, $2, $3, $4, $5)",
        [order.id, item.product_id, item.amount, item.price, item.category]
      );
    }


    const fullOrder = await getOrderById(order.id);

    return fullOrder;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
};

export const addUserToOrder = async (orderId: number, customerId: number) => {
  const client = await pool.connect();
  try {
    await client.query("UPDATE orders SET customer_id = $1 WHERE id = $2", [
      customerId,
      orderId,
    ]);
  } finally {
    client.release();
  }
};
export const getOrderById = async (orderId: number) => {
  const orderRes = await pool.query("SELECT * FROM orders WHERE id=$1", [
    orderId,
  ]);
  if (!orderRes.rows[0]) throw new Error("Order not found");

  const itemsRes = await pool.query(
    `SELECT oi.*, p.title, p.image 
     FROM order_items oi 
     JOIN products p ON oi.product_id = p.id 
     WHERE order_id=$1`,
    [orderId]
  );

  return {
    ...orderRes.rows[0],
    items: itemsRes.rows,
  };
};

export const updateOrder = async (
  orderId: number,
  updates: { customerId?: number; total?: number }
) => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (updates.customerId !== undefined) {
    fields.push(`customer_id = $${idx++}`);
    values.push(updates.customerId);
  }
  if (updates.total !== undefined) {
    fields.push(`total = $${idx++}`);
    values.push(updates.total);
  }

  if (fields.length === 0) return getOrderById(orderId);

  values.push(orderId);
  const query = `UPDATE orders SET ${fields.join(
    ", "
  )} WHERE id=$${idx} RETURNING *`;
  const res = await pool.query(query, values);
  return res.rows[0];
};

export const deleteOrder = async (orderId: number) => {
  await pool.query("DELETE FROM orders WHERE id=$1", [orderId]);
  return { message: "Order deleted" };
};

export const getAllOrders = async () => {
  const res = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
  return res.rows;
};
export const markOrderAsPaid = async (orderId: number) => {
  const res = await pool.query(
    "UPDATE orders SET status = 'paid' WHERE id = $1 RETURNING *",
    [orderId]
  );

  if (!res.rows[0]) throw new Error("Order not found");

  return res.rows[0];
};