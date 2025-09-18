import pool from "../config/db";
import Decimal from "decimal.js";
export const getCartItems = async () => {
  const result = await pool.query(`
    SELECT 
      c.id AS cart_id,
      c.amount,
      c.created_at,
      c.updated_at,
      p.id AS product_id,
      p.title,
      p.price,
      p.description,
      p.category,
      p.image,
      p.rating_rate,
      p.rating_count,
      p.stock
    FROM cart c
    JOIN products p ON c.product_id = p.id
  `);

  return result.rows 
};
export const addItemToCart = async (productId: number, amount: number) => {
  const existing = await pool.query(
    "SELECT * FROM cart WHERE product_id = $1",
    [productId]
  );

  if (existing.rows.length > 0) {
    await pool.query(
      "UPDATE cart SET amount = amount + $1 WHERE product_id = $2",
      [amount, productId]
    );
  } else {
    await pool.query("INSERT INTO cart (product_id, amount) VALUES ($1, $2)", [
      productId,
      amount,
    ]);
  }
};

export const removeItemFromCart = async (productId: string) => {
  await pool.query("DELETE FROM cart WHERE product_id = $1", [productId]);
};
export const updateItemAmount = async (productId: string, amount: number) => {
  if (amount <= 0) {
    await removeItemFromCart(productId);
  } else {
    await pool.query("UPDATE cart SET amount = $1 WHERE product_id = $2", [
      amount,
      productId,
    ]);
  }
};
export const clearCart = async () => {
  await pool.query("DELETE FROM cart");
};

export const getCartTotal = async (): Promise<number> => {
  const result = await pool.query(`
    SELECT c.amount, p.price
    FROM cart c
    JOIN products p ON c.product_id = p.id
  `);

  const total = result.rows.reduce((sum, item) => {
    const price = new Decimal(item.price);
    const amount = new Decimal(item.amount);
    return sum.plus(price.times(amount));
  }, new Decimal(0));

  return total.toNumber();
};