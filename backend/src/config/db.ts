import dotenv from "dotenv";
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });
const isProd = process.env.NODE_ENV === "production";

import { Pool } from "pg";

const pool = new Pool(
  isProd
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 5432,
      }
);

pool.on("connect", () => {
  console.log(`Postgres connection established (${isProd ? "prod" : "dev"})`);
});

export default pool;
