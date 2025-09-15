import pool from "../config/db";

const createUserTable = async () => {
  const queryText = `
   CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
)
    `;
  try {
    await pool.query(queryText);
    console.log("User table created if not exits");
  } catch {
    console.log("Erro creating user table");
  }
};

export default createUserTable;
