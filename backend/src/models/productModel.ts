import { Product } from "../types/Product";
import pool from "../config/db";
import Decimal from "decimal.js";

export const createProduct = async (products: Product[]) => {
  const productPromises = products.map((product) => {
    const randomStock = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
   const amountInMinorUnits = new Decimal(product.price).times(100).toNumber();
    return pool.query(
      `INSERT INTO products 
        (id, title, price, description, category, image, rating_rate, rating_count, stock) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        product.id,
        product.title,
        amountInMinorUnits,
        product.description,
        product.category,
        product.image,
        product.rating.rate,
        product.rating.count,
        randomStock,
      ]
    );
  });

  await Promise.all(productPromises);

  return { success: true };
};
export const createCategory = async (categories: string[]) => {
  const categoriesPromises = categories.map((category) =>
    pool.query(
      `INSERT INTO categories (category) 
       VALUES ($1) 
       ON CONFLICT (category) DO NOTHING`,
      [category]
    )
  );

  await Promise.all(categoriesPromises);

  return { success: true };
};
export const searchProducts = async (query: string): Promise<Product[]> => {
  const safeQuery = query.replace(/[%_]/g, "\\$&");
  const result = await pool.query(
    `SELECT * FROM products 
     WHERE title ILIKE $1 OR description ILIKE $1`,
    [`%${safeQuery}%`]
  );
  return result.rows as Product[];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const result = await pool.query(
    `SELECT * FROM products WHERE id = $1 LIMIT 1`,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0] as Product;
};
