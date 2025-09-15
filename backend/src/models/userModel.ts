import pool from "../config/db";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export const createUserService = async (
  email: string,
  password: string
) => {
  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, password]
  );
  return result.rows[0];
};

export const getUserByEmailService = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return result.rows[0];
};
