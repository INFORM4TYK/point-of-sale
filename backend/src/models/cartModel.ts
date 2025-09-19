
import pool from "../config/db";
import Decimal from "decimal.js";

export const getCartItems = async (cartId: number) => {
  const result = await pool.query(
    `
    SELECT 
      ci.cart_id,
      ci.amount,
      ci.created_at,
      ci.updated_at,
      ci.category,
      p.id AS product_id,
      p.title,
      p.price,
      p.description,
      p.image,
      p.rating_rate,
      p.rating_count,
      p.stock
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = $1
    ORDER BY ci.created_at ASC
  `,
    [cartId]
  );
  
  return result.rows;
};

export const addItemToCart = async (
  productId: number,
  amount: number,
  cartId: number
) => {
  const cartExists = await pool.query("SELECT * FROM carts WHERE id = $1", [
    cartId,
  ]);

  if (cartExists.rows.length === 0) {
    await pool.query("INSERT INTO carts (id, name) VALUES ($1, $2)", [
      cartId,
      `cart_${cartId}`,
    ]);
  }

  const existing = await pool.query(
    "SELECT * FROM cart_items WHERE product_id = $1 AND cart_id = $2",
    [productId, cartId]
  );

   if (existing.rows.length > 0) {
    await pool.query(
      "UPDATE cart_items SET amount = amount + $1 WHERE product_id = $2 AND cart_id = $3",
      [amount, productId, cartId]
    );
  } else {
    const productRes = await pool.query(
      "SELECT category FROM products WHERE id = $1",
      [productId]
    );

    if (productRes.rows.length === 0) {
      throw new Error("Product not found");
    }

    const category = productRes.rows[0].category;

    await pool.query(
      "INSERT INTO cart_items (product_id, amount, cart_id, category) VALUES ($1, $2, $3, $4)",
      [productId, amount, cartId, category]
    );
  }
};
export const removeItemFromCart = async (productId: string, cartId: number) => {
  await pool.query(
    "DELETE FROM cart_items WHERE product_id = $1 AND cart_id = $2",
    [productId, cartId]
  );
};

export const updateItemAmount = async (
  productId: string,
  amount: number,
  cartId: number
) => {
  if (amount <= 0) {
    await removeItemFromCart(productId, cartId);
  } else {
    await pool.query(
      "UPDATE cart_items SET amount = $1 WHERE product_id = $2 AND cart_id = $3",
      [amount, productId, cartId]
    );
  }
};

export const clearCart = async (cartId: number) => {
  await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cartId]);
};

export const getCartTotal = async (cartId: number): Promise<number> => {
  const result = await pool.query(
    `
    SELECT ci.amount, p.price
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = $1
  `,
    [cartId]
  );

  const total = result.rows.reduce((sum, item) => {
    const price = new Decimal(item.price);
    const amount = new Decimal(item.amount);
    return sum.plus(price.times(amount));
  }, new Decimal(0));

  return total.toNumber();
};