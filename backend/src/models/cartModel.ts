import pool from "../config/db";
import Decimal from "decimal.js";
export const getCartItems = async () => {
  const result = await pool.query("SELECT * FROM cart");
  return result.rows;
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

  // używamy Decimal do dokładnego mnożenia i sumowania
  const total = result.rows.reduce((sum, item) => {
    const price = new Decimal(item.price);
    const amount = new Decimal(item.amount);
    return sum.plus(price.times(amount));
  }, new Decimal(0));

  // zwracamy jako number w groszach lub PLN z dokładnością 2 miejsc
  return total.toNumber(); // jeśli price w PLN
  // return total.toDecimalPlaces(2).toNumber(); // jeśli chcesz dokładnie 2 miejsca po przecinku
};