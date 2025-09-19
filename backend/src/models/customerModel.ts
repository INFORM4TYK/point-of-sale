import pool from "../config/db";
import { Customer } from "../types/Customer";

export const addCustomer = async (
  name: string,
  phone: number,
  email: string
): Promise<Customer> => {
  const result = await pool.query(
    "INSERT INTO customers (name, phone, email) VALUES ($1, $2, $3) RETURNING *",
    [name, phone, email]
  );
  return result.rows[0];
};

export const getAllCustomers = async (): Promise<Customer[]> => {
  const result = await pool.query(
    "SELECT * FROM customers ORDER BY created_at DESC"
  );
  return result.rows;
};

export const getCustomerById = async (id: number): Promise<Customer> => {
  const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
    id,
  ]);
  if (!result.rows[0]) throw new Error("Customer not found");
  return result.rows[0];
};

export const updateCustomer = async (
  id: number,
  updates: { name?: string; phone?: number; email?: string }
): Promise<Customer> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (updates.name) {
    fields.push(`name = $${idx++}`);
    values.push(updates.name);
  }
  if (updates.phone) {
    fields.push(`phone = $${idx++}`);
    values.push(updates.phone);
  }
  if (updates.email) {
    fields.push(`email = $${idx++}`);
    values.push(updates.email);
  }

  if (fields.length === 0) return getCustomerById(id);

  values.push(id);
  const query = `UPDATE customers SET ${fields.join(
    ", "
  )} WHERE id=$${idx} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteCustomer = async (id: number) => {
  await pool.query("DELETE FROM customers WHERE id=$1", [id]);
  return { message: "Customer deleted" };
};

export const searchCustomers = async (query: string): Promise<Customer[]> => {
  const safeQuery = query.replace(/[%_]/g, "\\$&");
  const result = await pool.query(
    `SELECT * FROM customers
     WHERE name ILIKE $1 OR email ILIKE $1 OR CAST(phone AS TEXT) ILIKE $1
     ORDER BY created_at DESC`,
    [`%${safeQuery}%`]
  );
  return result.rows as Customer[];
};
