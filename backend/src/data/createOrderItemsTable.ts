import pool from "../config/db";

const createOrderItemsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INT REFERENCES orders(id) ON DELETE CASCADE,
      product_id INT NOT NULL,
      quantity INT NOT NULL
    )
  `;
  try {
    await pool.query(queryText);
    console.log("Order_items table created or already exists");
  } catch (err) {
    console.error("Error creating order_items table:", err);
  }
};

export default createOrderItemsTable;
