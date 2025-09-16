import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
});

pool.on("connect", () => {
  console.log("Connection pool establised");
});

export default pool;
