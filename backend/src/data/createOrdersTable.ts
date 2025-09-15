import pool from "../config/db";

const createOrdersTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      total NUMERIC(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  try {
    await pool.query(queryText);
    console.log("Orders table created or already exists");
  } catch (err) {
    console.error("Error creating orders table:", err);
  }
};

export default createOrdersTable;